import { inject, injectable } from "tsyringe";
import { IUpdateNewPasswordController } from "../../../entities/controllerInterfaces/auth/update-new-password-controller.interface";
import { IUpdateNewPasswordUseCase } from "../../../entities/useCaseInterfaces/auth/update-new-password-usecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";

@injectable()
export class UpdateNewPasswordController
  implements IUpdateNewPasswordController
{
  constructor(
    @inject("IUpdateNewPasswordUseCase")
    private updateNewPasswordUseCase: IUpdateNewPasswordUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email, role, newPassword, confirmPassword } = req.body;

    await this.updateNewPasswordUseCase.execute(email, role, newPassword);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
