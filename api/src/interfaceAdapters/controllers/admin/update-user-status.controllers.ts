import { Request, Response } from "express";
import { IUpdateUserStatusController } from "../../../entities/controllerInterfaces/admin/update-user-status-controller.interface";
import { IUpdateUserStatusUseCase } from "../../../entities/useCaseInterfaces/admin/update-user-status-usecase.interface";
import { inject, injectable } from "tsyringe";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";

@injectable()
export class UpdateUserStatusController implements IUpdateUserStatusController {
  constructor(
    @inject("IUpdateUserStatusUseCase")
    private updateUserStatusUseCase: IUpdateUserStatusUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { userType, userId } = req.query as {
      userType: string;
      userId: any;
    };

    console.log("user type => ", userType);
    console.log("user id => ", userId);

    await this.updateUserStatusUseCase.execute(userType, userId);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
