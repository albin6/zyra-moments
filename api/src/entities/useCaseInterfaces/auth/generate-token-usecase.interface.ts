export interface IGenerateTokenUseCase {
  execute(
    id: string,
    email: string,
    role: string
  ): { accessToken: string; refreshToken: string };
}
