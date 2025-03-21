import { Schema } from "mongoose";
import { ITicketModel } from "../models/ticket.model";

export const ticketSchema = new Schema<ITicketModel>(
  {
    ticketId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
    qrCode: { type: String, required: true },
    isScanned: { type: Boolean, default: false },
    scannedAt: { type: Date },
    status: {
      type: String,
      enum: ["PURCHASED", "USED", "CANCELLED"],
      default: "PURCHASED",
    },
  },
  { timestamps: true }
);

ticketSchema.index({ eventId: 1 });
ticketSchema.index({ userId: 1 });
