import { model, ObjectId } from "mongoose";
import { IServiceEntity } from "../../../entities/models/service.entity";
import { serviceSchema } from "../schemas/service.schema";

export interface IServiceModel extends Omit<IServiceEntity, "_id"> {
  _id: ObjectId;
}

export const ServiceModel = model<IServiceModel>("Service", serviceSchema);
