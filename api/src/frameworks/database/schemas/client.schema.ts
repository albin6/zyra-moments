import { Schema } from "mongoose";
import { ROLES } from "../../../shared/constants";
import { IClientModel } from "../models/client.model";

export const ClientSchema = new Schema<IClientModel>(
  {
    clientId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ROLES, required: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    masterOfCeremonies: { type: Boolean, default: false },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
);
