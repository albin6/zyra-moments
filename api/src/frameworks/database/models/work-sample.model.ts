import { Document, model, ObjectId } from "mongoose";
import { IWorkSampleEntity } from "../../../entities/models/work-sample.entity";
import { workSampleSchema } from "../schemas/work-sample.schema";

export interface IWorkSampleModel
  extends Omit<IWorkSampleEntity, "_id" | "vendorId">,
    Document {
  _id: ObjectId;
  vendorId: ObjectId;
}

export const WorkSampleModel = model<IWorkSampleModel>(
  "WorkSample",
  workSampleSchema
);
