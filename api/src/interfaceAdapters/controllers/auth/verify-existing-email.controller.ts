import { Request, Response } from "express";
import { IVerifyExistingEmailController } from "../../../entities/controllerInterfaces/auth/verify-existing-email-controller.interface";
import { IVerifyExistingEmailUseCase } from "../../../entities/useCaseInterfaces/auth/verify-existing-email-usecase.inteface";
import { inject, injectable } from "tsyringe";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";

@injectable()
export class VerifyExistingEmailController
  implements IVerifyExistingEmailController
{
  constructor(
    @inject("IVerifyExistingEmailUseCase")
    private verifyExistingEmailUseCase: IVerifyExistingEmailUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    await this.verifyExistingEmailUseCase.execute(email);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS });
  }
}
