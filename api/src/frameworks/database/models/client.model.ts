import { model, Document } from "mongoose";
import { ClientSchema } from "../schemas/client.schema";
import { IClientEntity } from "../../../entities/models/client.entity";

export interface IClientModel extends Omit<IClientEntity, "_id">, Document {}
export const ClientModel = model<IClientModel>("Client", ClientSchema);
