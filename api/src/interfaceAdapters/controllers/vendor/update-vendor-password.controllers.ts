import { Request, Response } from "express";
import { IUpdateVendorPasswordController } from "../../../entities/controllerInterfaces/vendor/update-vendor-password-controller.interface";
import { IUpdateVendorPasswordUseCase } from "../../../entities/useCaseInterfaces/vendor/update-vendor-password-usecase.interface";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../../../entities/utils/CustomError";

@injectable()
export class UpdateVendorPasswordController
  implements IUpdateVendorPasswordController
{
  constructor(
    @inject("IUpdateVendorPasswordUseCase")
    private updateVendorPasswordUseCase: IUpdateVendorPasswordUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = (req as CustomRequest).user.id;
      const { currentPassword, newPassword } = req.body as {
        currentPassword: string;
        newPassword: string;
      };

      await this.updateVendorPasswordUseCase.execute(
        id,
        currentPassword,
        newPassword
      );

      res
        .status(200)
        .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
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
