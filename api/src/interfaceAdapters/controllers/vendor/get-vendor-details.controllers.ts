import { Request, Response } from "express";
import { IGetVendorDetailsController } from "../../../entities/controllerInterfaces/vendor/get-vendor-details-controller.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { IGetVendorDetailsUseCase } from "../../../entities/useCaseInterfaces/vendor/get-vendor-details-usecase.interface";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVendorDetailsController implements IGetVendorDetailsController {
  constructor(
    @inject("IGetVendorDetailsUseCase")
    private getVendorDetailsUseCase: IGetVendorDetailsUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const vendorId = (req as CustomRequest).user.id;

      const vendor = await this.getVendorDetailsUseCase.execute(vendorId);

      res.status(HTTP_STATUS.OK).json({ success: true, vendor });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
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
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
