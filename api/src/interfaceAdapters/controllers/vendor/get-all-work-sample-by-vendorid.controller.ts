import { Request, Response } from "express";
import { IGetAllWorkSampleByVendorIdController } from "../../../entities/controllerInterfaces/vendor/get-all-work-sample-by-vendorid-controller.interface";
import { IGetAllWorkSampleByVendorIdUseCase } from "../../../entities/useCaseInterfaces/vendor/get-all-work-sample-by-vendorid-usecase.interface";
import { inject, injectable } from "tsyringe";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class GetAllWorkSampleByVendorIdController
  implements IGetAllWorkSampleByVendorIdController
{
  constructor(
    @inject("IGetAllWorkSampleByVendorIdUseCase")
    private getAllWorkSampleByVendorIdUseCase: IGetAllWorkSampleByVendorIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const vendorId = (req as CustomRequest).user.id;
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = Number(page);
      const pageSize = Number(limit);

      const { workSamples, total } =
        await this.getAllWorkSampleByVendorIdUseCase.execute(
          vendorId,
          pageNumber,
          pageSize
        );

      res
        .status(HTTP_STATUS.OK)
        .json({
          success: true,
          workSamples,
          totalPages: total,
          currentPage: pageNumber,
        });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
          errors,
        });
        return;
      }
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
}
