import { Schema } from "mongoose";
import { IWalletModel } from "../models/wallet.model";

export const walletSchema = new Schema<IWalletModel>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    role: { type: String, required: true },
    balance: { type: Number, default: 0 },
    paymentId: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
  },
  { timestamps: true }
);
