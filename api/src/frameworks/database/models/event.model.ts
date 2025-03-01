import { Document, model, ObjectId } from "mongoose";
import { IEventEntity } from "../../../entities/models/event.entity";
import { EventSchema } from "../schemas/event.schema";

export interface IEventModel extends Omit<IEventEntity, "_id">, Document {
  _id: ObjectId;
}

export const EventModel = model<IEventModel>("Event", EventSchema);
