import { inject, injectable } from "tsyringe";
import { ITokenService } from "./interfaces/token-service.interface";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/refresh-toke-usecase.inteface";

@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(@inject("ITokenService") private tokenService: ITokenService) {}

  execute(refreshToken: string): { accessToken: string; refreshToken: string } {
    const payload = this.tokenService.verifyRefreshToken(refreshToken);
    if (!payload) throw new Error("Invalid refresh token");

    return {
      accessToken: this.tokenService.generateAccessToken(
        payload as { id: string; email: string; role: string }
      ),
      refreshToken: this.tokenService.generateRefreshToken(
        payload as { id: string; email: string; role: string }
      ),
    };
  }
}
