export interface IVerifyOTPUseCase {
  execute({ email, otp }: { email: string; otp: string }): Promise<void>;
}
