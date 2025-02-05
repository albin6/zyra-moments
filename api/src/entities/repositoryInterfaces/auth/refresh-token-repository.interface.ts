import { ObjectId } from "mongoose";
import { TRole } from "../../../shared/constants";

export interface IRefreshTokenRepository {
  save(data: {
    token: string;
    userType: TRole;
    user: ObjectId;
    expiresAt: number;
  }): Promise<void>;

  revokeRefreshToken(token: string): Promise<void>;
}
