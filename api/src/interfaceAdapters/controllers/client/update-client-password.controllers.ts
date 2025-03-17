import { Request, Response } from "express";
import { IUpdateClientPasswordController } from "../../../entities/controllerInterfaces/client/update-client-password-controller.interface";
import { IUpdateClientPasswordUseCase } from "../../../entities/useCaseInterfaces/client/update-client-password-usecase.interface";
import { inject, injectable } from "tsyringe";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class UpdateClientPasswordController
  implements IUpdateClientPasswordController
{
  constructor(
    @inject("IUpdateClientPasswordUseCase")
    private updateClientPasswordUseCase: IUpdateClientPasswordUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const id = (req as CustomRequest).user.id;
    const { currentPassword, newPassword } = req.body as {
      currentPassword: string;
      newPassword: string;
    };

    await this.updateClientPasswordUseCase.execute(
      id,
      currentPassword,
      newPassword
    );

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
