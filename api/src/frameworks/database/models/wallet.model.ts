import { Document, model, ObjectId } from "mongoose";
import { IWalletEntity } from "../../../entities/models/wallet.entity";
import { walletSchema } from "../schemas/wallet.schema";

export interface IWalletModel
  extends Omit<IWalletEntity, "_id" | "userId">,
    Document {
  _id: ObjectId;
  userId: ObjectId;
}

export const WalletModel = model<IWalletModel>("Wallet", walletSchema);
