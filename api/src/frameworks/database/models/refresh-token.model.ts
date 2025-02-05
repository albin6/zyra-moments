import { model } from "mongoose";
import { RefreshTokenSchema } from "../schemas/refresh-token.schema";
import { IRefreshTokenEntity } from "../../../entities/models/refresh-token.entity";

export interface IRefreshTokenModel extends IRefreshTokenEntity, Document {}

export const RefreshTokenModel = model<IRefreshTokenModel>(
  "RefreshToken",
  RefreshTokenSchema
);
