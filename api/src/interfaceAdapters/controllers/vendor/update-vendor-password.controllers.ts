import { Request, Response } from "express";
import { IUpdateVendorPasswordController } from "../../../entities/controllerInterfaces/vendor/update-vendor-password-controller.interface";
import { IUpdateVendorPasswordUseCase } from "../../../entities/useCaseInterfaces/vendor/update-vendor-password-usecase.interface";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";

@injectable()
export class UpdateVendorPasswordController
  implements IUpdateVendorPasswordController
{
  constructor(
    @inject("IUpdateVendorPasswordUseCase")
    private updateVendorPasswordUseCase: IUpdateVendorPasswordUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
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
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
