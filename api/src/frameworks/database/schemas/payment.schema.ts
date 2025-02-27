import { Schema } from "mongoose";
import { IPaymentModel } from "../models/payment.model";

export const paymentSchema = new Schema<IPaymentModel>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, min: 0, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "succeeded",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      default: "pending",
    },
    paymentIntentId: { type: String },
    purpose: {
      type: String,
      enum: ["vendor-booking", "role-upgrade", "ticket-purchase"],
      required: true,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ bookingId: 1 });
