import { Request, Response } from "express";
import { ISendEmailController } from "../../../entities/controllerInterfaces/auth/send-email-controller.inteface";
import { ISendEmailUseCase } from "../../../entities/useCaseInterfaces/auth/send-email-usecase.inteface";
import { inject, injectable } from "tsyringe";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../../../entities/utils/CustomError";

@injectable()
export class SendEmailController implements ISendEmailController {
  constructor(
    @inject("ISendEmailUseCase") private sendEmailUseCase: ISendEmailUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.sendEmailUseCase.execute(email);
      res
        .status(HTTP_STATUS.OK)
        .json({ message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS });
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
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR, error });
    }
  }
}
