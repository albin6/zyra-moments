import { Schema } from "mongoose";
import { IVendorModel } from "../models/vendor.model";
import { ROLES } from "../../../shared/constants";

export const VendorSchema = new Schema<IVendorModel>(
  {
    vendorId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLES, required: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    category: { type: String },
    bio: { type: String },
    place: { type: String },
    averageRating: { type: Number },
    totalReviews: { type: Number },
    requestStatus: { type: String },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
