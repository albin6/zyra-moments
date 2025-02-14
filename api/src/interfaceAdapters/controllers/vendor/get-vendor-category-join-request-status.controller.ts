import { Request, Response } from "express";
import { IGetVendorCategoryJoinRequestStatusController } from "../../../entities/controllerInterfaces/vendor/get-vendor-category-join-request-status-controller.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { IGetVendorCategoryJoinRequestStatusUseCase } from "../../../entities/useCaseInterfaces/vendor/get-vendor-category-join-request-status-usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVendorCategoryJoinRequestStatusController
  implements IGetVendorCategoryJoinRequestStatusController
{
  constructor(
    @inject("IGetVendorCategoryJoinRequestStatusUseCase")
    private getVendorCategoryRequestStatusUseCase: IGetVendorCategoryJoinRequestStatusUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const vendorId = (req as CustomRequest).user.id;

      const status = await this.getVendorCategoryRequestStatusUseCase.execute(
        vendorId
      );

      res.status(HTTP_STATUS.OK).json({ success: true, status });
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
