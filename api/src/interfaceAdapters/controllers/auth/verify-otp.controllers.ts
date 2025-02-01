import { Request, Response } from "express";
import { IVerifyOTPController } from "../../../entities/controllerInterfaces/auth/verify-otp-controller.interface";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { IVerifyOTPUseCase } from "../../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { emailVerifySchema } from "./validation/email-validation.schema";
import { inject, injectable } from "tsyringe";

@injectable()
export class VerifyOTPController implements IVerifyOTPController {
  constructor(
    @inject("IVerifyOTPUseCase") private verifyOTPUseCase: IVerifyOTPUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;
      const validatedData = emailVerifySchema.parse({ email, otp });

      await this.verifyOTPUseCase.execute(validatedData);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS,
      });
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
