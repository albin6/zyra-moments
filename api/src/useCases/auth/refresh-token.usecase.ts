import { inject, injectable } from "tsyringe";
import { ITokenService } from "./interfaces/token-service.interface";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/refresh-toke-usecase.inteface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";
import { JwtPayload } from "jsonwebtoken";

@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(@inject("ITokenService") private tokenService: ITokenService) {}

  execute(refreshToken: string): {
    role: string;
    accessToken: string;
    refreshToken: string;
  } {
    const payload = this.tokenService.verifyRefreshToken(refreshToken);
    if (!payload)
      throw new CustomError("Invalid refresh token", HTTP_STATUS.BAD_REQUEST);

    return {
      role: (payload as JwtPayload).role,
      accessToken: this.tokenService.generateAccessToken({
        id: (payload as JwtPayload).id,
        email: (payload as JwtPayload).email,
        role: (payload as JwtPayload).role,
      }),
      refreshToken: this.tokenService.generateRefreshToken({
        id: (payload as JwtPayload).id,
        email: (payload as JwtPayload).email,
        role: (payload as JwtPayload).role,
      }),
    };
  }
}
