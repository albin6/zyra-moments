import { inject, injectable } from "tsyringe";
import { IVerifyExistingEmailUseCase } from "../../entities/useCaseInterfaces/auth/verify-existing-email-usecase.inteface";
import { IEmailService } from "../../entities/services/email-service.interface";
import { IOTPService } from "../../entities/services/otp-service.inteface";
import { IUserExistenceService } from "../../entities/services/user-existence-service.interface";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class VerifyExistingEmailUseCase implements IVerifyExistingEmailUseCase {
  constructor(
    @inject("IEmailService") private emailService: IEmailService,
    @inject("IOTPService") private otpService: IOTPService,
    @inject("IUserExistenceService")
    private userExistenceService: IUserExistenceService,
    @inject("IOTPBcrypt") private otpBcrypt: IBcrypt
  ) {}

  async execute(email: string): Promise<void> {
    const emailExists = await this.userExistenceService.emailExists(email);
    if (!emailExists) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const otp = this.otpService.generateOTP();
    const hashedOTP = await this.otpBcrypt.hash(otp);
    await this.otpService.storeOTP(email, hashedOTP);
    await this.emailService.sendEmail(
      email,
      "Zyra Moments - Verify Your Email",
      otp
    );
  }
}
