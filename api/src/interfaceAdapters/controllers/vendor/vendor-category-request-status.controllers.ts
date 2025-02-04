import { Request, Response } from "express";
import { IVendorCategoryRequestStatusController } from "../../../entities/controllerInterfaces/vendor/vendor-category-request-status-controller.inteface";
import { IVendorCategoryRequestStatusUseCase } from "../../../entities/useCaseInterfaces/common/vendor-category-request-status-usecase.inteface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class VendorCategoryRequestStatusController
  implements IVendorCategoryRequestStatusController
{
  constructor(
    @inject("IVendorCategoryRequestStatusUseCase")
    private vendorCategoryRequestStatusUseCase: IVendorCategoryRequestStatusUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const vendorId = (req as CustomRequest).user.id;
      await this.vendorCategoryRequestStatusUseCase.execute(vendorId);
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: "Requested Or Joined in Category" });
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
