import { IOTPModel } from "../../../frameworks/database/models/otp.model";

export interface IOTPRepository {
  saveOTP(email: string, otp: string, expiresAt: Date): Promise<void>;
  findOTP({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }): Promise<IOTPModel | null>;
  deleteOTP(email: string, otp: string): Promise<void>;
}
