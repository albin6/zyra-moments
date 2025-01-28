import { Document, model, ObjectId } from "mongoose";
import { IVendorEntity } from "../../../entities/models/vendor.entity";
import { VendorSchema } from "../schemas/vendor.schema";

export interface IVendorModel extends Omit<IVendorEntity, "_id">, Document {
  _id: ObjectId;
}
export const VendorModel = model<IVendorModel>("Vendor", VendorSchema);
