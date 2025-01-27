import { Schema } from "mongoose";
import { ROLES } from "../../../shared/constants";
import { IClientModel } from "../models/client.model";

export const ClientSchema = new Schema<IClientModel>(
  {
    clientId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLES, required: true },
    profileImage: { type: String },
    phone: { type: String },
    masterOfCeremonies: { type: Boolean, default: false },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
