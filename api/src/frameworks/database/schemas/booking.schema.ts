import { Schema } from "mongoose";

export const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },

  serviceDetails: {
    serviceTitle: { type: String, required: true },
    serviceDescription: { type: String, required: true },
    serviceDuration: { type: Number, required: true },
    servicePrice: { type: Number, required: true },
    additionalHoursPrice: { type: Number, required: true },
    cancellationPolicies: { type: [String], required: true },
    termsAndConditions: { type: [String], required: true },
  },

  bookingDate: { type: String, required: true },
  timeSlot: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },

  totalPrice: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },

  status: {
    type: String,
    enum: ["confirmed", "cancelled", "completed"],
    default: "confirmed",
  },

  createdAt: { type: Date, default: Date.now },
});
