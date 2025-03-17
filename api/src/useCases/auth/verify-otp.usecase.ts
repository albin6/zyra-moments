import { inject, injectable } from "tsyringe";
import { IOTPService } from "../../entities/services/otp-service.inteface";
import { IVerifyOTPUseCase } from "../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class VerifyOTPUseCase implements IVerifyOTPUseCase {
  constructor(@inject("IOTPService") private otpService: IOTPService) {}

  async execute({ email, otp }: { email: string; otp: string }): Promise<void> {
    const isOTPValid = await this.otpService.verifyOTP({ email, otp });

    if (!isOTPValid) {
      throw new CustomError("Invalid OTP", HTTP_STATUS.BAD_REQUEST);
    }
  }
}
