import { IOTPRepository } from "../../../entities/repositoryInterfaces/auth/otp-repository.inteface";
import { OTPModel } from "../../../frameworks/database/models/otp.model";

export class OTPRepository implements IOTPRepository {
  async saveOTP(email: string, otp: string, expiresAt: Date): Promise<void> {
    await OTPModel.create({ email, otp, expiresAt });
  }

  async findOTP(email: string, otp: string): Promise<boolean> {
    const otpEntry = await OTPModel.findOne({ email, otp });
    if (!otpEntry) return false;
    if (new Date() > otpEntry.expiresAt) {
      await OTPModel.deleteOne({ email, otp });
      return false;
    }
    await OTPModel.deleteOne({ email, otp });
    return true;
  }

  async deleteOTP(email: string, otp: string): Promise<void> {
    await OTPModel.deleteOne({ email, otp });
  }
}
