export interface IUpdateNewPasswordUseCase {
  execute(
    email: string,
    role: string,
    password: string,
  ): Promise<void>;
}
