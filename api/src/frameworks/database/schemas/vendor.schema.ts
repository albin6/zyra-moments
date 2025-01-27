import { Schema } from "mongoose";
import { IVendorModel } from "../models/vendor.model";
import { ROLES } from "../../../shared/constants";

export const VendorSchema = new Schema<IVendorModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ROLES, required: true },
  profileImage: { type: String },
  phone: { type: String },
  category: { type: String },
  bio: { type: String },
  place: { type: String },
  averageRating: { type: Number },
  totalReviews: { type: Number },
  requestStatus: { type: String },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
