import { Request, Response } from "express";
import { IVerifyOTPController } from "../../../entities/controllerInterfaces/auth/verify-otp-controller.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { IVerifyOTPUseCase } from "../../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { emailVerifySchema } from "./validation/email-validation.schema";
import { inject, injectable } from "tsyringe";

@injectable()
export class VerifyOTPController implements IVerifyOTPController {
  constructor(
    @inject("IVerifyOTPUseCase") private verifyOTPUseCase: IVerifyOTPUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    const validatedData = emailVerifySchema.parse({ email, otp });

    await this.verifyOTPUseCase.execute(validatedData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS,
    });
  }
}
