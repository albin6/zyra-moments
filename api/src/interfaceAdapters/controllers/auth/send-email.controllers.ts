import { Request, Response } from "express";
import { ISendEmailController } from "../../../entities/controllerInterfaces/auth/send-email-controller.inteface";
import { ISendEmailUseCase } from "../../../entities/useCaseInterfaces/auth/send-email-usecase.inteface";
import { inject, injectable } from "tsyringe";

@injectable()
export class SendEmailController implements ISendEmailController {
  constructor(
    @inject("ISendEmailUseCase") private sendEmailUseCase: ISendEmailUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.sendEmailUseCase.execute(email);
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error sending OTP", error });
    }
  }
}
