import { Request, Response } from "express";
import { ISendEmailController } from "../../../entities/controllerInterfaces/auth/send-email-controller.inteface";
import { ISendEmailUseCase } from "../../../entities/useCaseInterfaces/auth/send-email-usecase.inteface";
import { inject, injectable } from "tsyringe";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";

@injectable()
export class SendEmailController implements ISendEmailController {
  constructor(
    @inject("ISendEmailUseCase") private sendEmailUseCase: ISendEmailUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    await this.sendEmailUseCase.execute(email);
    res
      .status(HTTP_STATUS.OK)
      .json({ message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS });
  }
}
