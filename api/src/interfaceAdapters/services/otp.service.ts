import { inject, injectable } from "tsyringe";
import { IOTPRepository } from "../../entities/repositoryInterfaces/auth/otp-repository.inteface";
import { IOTPService } from "../../entities/services/otp-service.inteface";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";

@injectable()
export class OTPService implements IOTPService {
  constructor(
    @inject("IOTPRepository") private otpRepository: IOTPRepository,
    @inject("IOTPBcrypt") private otpBcrypt: IBcrypt
  ) {}

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async storeOTP(email: string, otp: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);
    await this.otpRepository.saveOTP(email, otp, expiresAt);
  }

  async verifyOTP({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }): Promise<boolean> {
    console.log(email, otp);
    const otpEntry = await this.otpRepository.findOTP({ email });

    if (!otpEntry) {
      return false;
    }

    if (
      new Date() > otpEntry.expiresAt ||
      !(await this.otpBcrypt.compare(otp, otpEntry.otp))
    ) {
      console.log("in otp verify ==>");
      await this.otpRepository.deleteOTP(email, otp);
      return false;
    }
    await this.otpRepository.deleteOTP(email, otp);
    return true;
  }
}
