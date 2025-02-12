import { Schema } from "mongoose";
import { IWorkSampleModel } from "../models/work-sample.model";

export const workSampleSchema = new Schema<IWorkSampleModel>(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);
