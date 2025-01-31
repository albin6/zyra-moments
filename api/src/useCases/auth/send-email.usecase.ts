import { inject, injectable } from "tsyringe";
import { IEmailService } from "../../entities/services/email-service.interface";
import { IOTPService } from "../../entities/services/otp-service.inteface";
import { ISendEmailUseCase } from "../../entities/useCaseInterfaces/auth/send-email-usecase.inteface";

@injectable()
export class SendEmailUseCase implements ISendEmailUseCase {
  constructor(
    @inject("IEmailService") private emailService: IEmailService,
    @inject("IOTPService") private otpService: IOTPService
  ) {}

  async execute(email: string): Promise<void> {
    const otp = this.otpService.generateOTP();
    await this.otpService.storeOTP(email, otp);
    await this.emailService.sendEmail(email, "OTP Verification", "234578");
  }
}
