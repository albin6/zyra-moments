import { inject, injectable } from "tsyringe";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import { ITokenService } from "./interfaces/token-service.interface";

@injectable()
export class GenerateTokenUseCase implements IGenerateTokenUseCase {
  constructor(@inject("ITokenService") private tokenService: ITokenService) {}

  execute(
    id: string,
    email: string,
    role: string
  ): { accessToken: string; refreshToken: string } {
    const payload = { id, email, role };

    return {
      accessToken: this.tokenService.generateAccessToken(payload),
      refreshToken: this.tokenService.generateRefreshToken(payload),
    };
  }
}
