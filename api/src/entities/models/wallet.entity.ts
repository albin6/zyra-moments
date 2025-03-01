import { ObjectId } from "mongoose";

export interface IWalletEntity {
  _id?: string | ObjectId;
  userId: string | ObjectId;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}
