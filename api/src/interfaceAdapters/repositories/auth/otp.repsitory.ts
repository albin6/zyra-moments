import { injectable } from "tsyringe";
import { IOTPRepository } from "../../../entities/repositoryInterfaces/auth/otp-repository.inteface";
import {
  IOTPModel,
  OTPModel,
} from "../../../frameworks/database/models/otp.model";

@injectable()
export class OTPRepository implements IOTPRepository {
  async saveOTP(email: string, otp: string, expiresAt: Date): Promise<void> {
    await OTPModel.create({ email, otp, expiresAt });
  }

  async findOTP({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }): Promise<IOTPModel | null> {
    const otpEntry = await OTPModel.find({ email, otp })
      .sort({ createdAt: -1 })
      .limit(1);
    return otpEntry.length > 0 ? otpEntry[0] : null;
  }

  async deleteOTP(email: string, otp: string): Promise<void> {
    await OTPModel.deleteOne({ email, otp });
  }
}
