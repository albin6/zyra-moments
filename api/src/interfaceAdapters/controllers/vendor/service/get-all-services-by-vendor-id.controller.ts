import { Request, Response } from "express";
import { IGetAllServicesByVendorIdController } from "../../../../entities/controllerInterfaces/vendor/service/get-all-services-by-vendor-id-controller.interface";
import { IGetAllServicesByVendorIdUseCase } from "../../../../entities/useCaseInterfaces/vendor/service/get-all-services-by-vendor-id-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../../shared/constants";
import { CustomError } from "../../../../entities/utils/CustomError";
import { CustomRequest } from "../../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllServicesByVendorIdController
  implements IGetAllServicesByVendorIdController
{
  constructor(
    @inject("IGetAllServicesByVendorIdUseCase")
    private getAllServicesByVendorIdUseCase: IGetAllServicesByVendorIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const vendorId = (req as CustomRequest).user.id;
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = Number(page);
      const pageSize = Number(limit);

      const { services, total, all } =
        await this.getAllServicesByVendorIdUseCase.execute(
          vendorId,
          pageNumber,
          pageSize
        );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        services,
        totalPages: total,
        currentPage: pageNumber,
        all,
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
