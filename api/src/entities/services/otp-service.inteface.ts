export interface IOTPService {
  generateOTP(): string;
  storeOTP(email: string, otp: string): Promise<void>;
  verifyOTP(email: string, otp: string): Promise<boolean>;
}
