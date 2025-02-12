import { ObjectId } from "mongoose";

export interface IWorkSampleEntity {
  _id?: ObjectId;
  vendorId: ObjectId;
  title: string;
  description: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
