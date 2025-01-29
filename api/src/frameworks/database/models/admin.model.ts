import { Document, model, ObjectId } from "mongoose";
import { IAdminEntity } from "../../../entities/models/admin.entity";
import { AdminSchema } from "../schemas/admin.schema";

export interface IAdminModel extends Omit<IAdminEntity, "_id">, Document {
  _id: ObjectId;
}

export const AdminModel = model<IAdminModel>("Admin", AdminSchema);
