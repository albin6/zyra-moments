import { model, ObjectId } from "mongoose";
import { IServiceEntity } from "../../../entities/models/service.entity";
import { serviceSchema } from "../schemas/service.schema";

export interface IServiceModel
  extends Omit<IServiceEntity, "_id" | "vendorId"> {
  _id: ObjectId;
  vendorId: ObjectId;
}

export const ServiceModel = model<IServiceModel>("Service", serviceSchema);
