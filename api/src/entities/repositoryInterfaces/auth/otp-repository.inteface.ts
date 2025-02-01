export interface IOTPRepository {
  saveOTP(email: string, otp: string, expiresAt: Date): Promise<void>;
  findOTP({ email, otp }: { email: string; otp: string }): Promise<boolean>;
  deleteOTP(email: string, otp: string): Promise<void>;
}
