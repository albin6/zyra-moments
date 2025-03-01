import { Schema } from "mongoose";
import { IWalletModel } from "../models/wallet.model";

export const walletSchema = new Schema<IWalletModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);
