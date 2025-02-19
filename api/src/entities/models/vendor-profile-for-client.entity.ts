import { ObjectId } from "mongoose";
import { IServiceEntity } from "./service.entity";
import { IWorkSampleEntity } from "./work-sample.entity";

export interface VendorProfileForClient {
  _id: ObjectId | string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  phoneNumber?: string;
  status: string;
  vendorId: string;
  category?: ObjectId | string;
  bio: string;
  place: string;
  averageRating: number;
  totalReviews: number;
  servicesData: { services: Partial<IServiceEntity>[] | []; total: number };
  workSamplesData: {
    workSamples: Partial<IWorkSampleEntity>[] | [];
    total: number;
  };
}
