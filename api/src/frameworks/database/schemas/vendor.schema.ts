import { Schema } from "mongoose";
import { IVendorModel } from "../models/vendor.model";
import { ROLES } from "../../../shared/constants";

export const VendorSchema = new Schema<IVendorModel>(
  {
    vendorId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ROLES, required: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    bio: { type: String },
    place: { type: String },
    averageRating: { type: Number },
    totalReviews: { type: Number },
    status: { type: String, default: "active" },
    onlineStatus: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    lastStatusUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
