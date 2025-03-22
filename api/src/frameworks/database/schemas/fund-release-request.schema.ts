import { Schema } from "mongoose";
import { IFundReleaseRequestModel } from "../models/fund-release-request.model";

export const fundReleaseRequestSchema = new Schema<IFundReleaseRequestModel>(
  {
    requestId: { type: String, required: true, unique: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    organizerId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    totalAmount: { type: Number, required: true },
    ticketSalesCount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "RELEASED"],
      default: "PENDING",
    },
    requestedAt: { type: Date, required: true },
    processedAt: { type: Date },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

fundReleaseRequestSchema.index({ eventId: 1 });
fundReleaseRequestSchema.index({ organizerId: 1 });
