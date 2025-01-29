import { Schema } from "mongoose";
import { IAdminModel } from "../models/admin.model";

export const AdminSchema = new Schema<IAdminModel>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  {
    timestamps: true,
  }
);
