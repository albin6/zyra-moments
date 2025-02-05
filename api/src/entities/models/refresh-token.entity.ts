import { ObjectId } from "mongoose";
import { TRole } from "../../shared/constants";

export interface IRefreshTokenEntity {
  _id?: ObjectId;
  token: string;
  user: ObjectId;
  userType: TRole;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
