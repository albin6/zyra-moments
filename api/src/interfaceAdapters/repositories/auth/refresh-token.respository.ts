import { ObjectId } from "mongoose";
import { IRefreshTokenRepository } from "../../../entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { TRole } from "../../../shared/constants";
import { RefreshTokenModel } from "../../../frameworks/database/models/refresh-token.model";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  async save(data: {
    token: string;
    userType: TRole;
    user: ObjectId;
    expiresAt: number;
  }): Promise<void> {
    await RefreshTokenModel.create({
      token: data.token,
      userType: data.userType,
      user: data.user,
      expiresAt: data.expiresAt,
    });
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ token });
  }
}
