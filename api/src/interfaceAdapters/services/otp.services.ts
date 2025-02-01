import { inject, injectable } from "tsyringe";
import { IOTPRepository } from "../../entities/repositoryInterfaces/auth/otp-repository.inteface";
import { IOTPService } from "../../entities/services/otp-service.inteface";

@injectable()
export class OTPService implements IOTPService {
  constructor(
    @inject("IOTPRepository") private otpRepository: IOTPRepository
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
    return await this.otpRepository.findOTP({ email, otp });
  }
}
