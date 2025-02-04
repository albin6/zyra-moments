import { inject, injectable } from "tsyringe";
import { IEmailService } from "../../entities/services/email-service.interface";
import { IOTPService } from "../../entities/services/otp-service.inteface";
import { ISendEmailUseCase } from "../../entities/useCaseInterfaces/auth/send-email-usecase.inteface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IUserExistenceService } from "../../entities/services/user-existence-service.interface";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";

@injectable()
export class SendEmailUseCase implements ISendEmailUseCase {
  constructor(
    @inject("IEmailService") private emailService: IEmailService,
    @inject("IOTPService") private otpService: IOTPService,
    @inject("IUserExistenceService")
    private userExistenceService: IUserExistenceService,
    @inject("IOTPBcrypt") private otpBcrypt: IBcrypt
  ) {}

  async execute(email: string): Promise<void> {
    const emailExists = await this.userExistenceService.emailExists(email);
    if (emailExists) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
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
