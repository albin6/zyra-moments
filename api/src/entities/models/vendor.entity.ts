import { ObjectId } from "mongoose";
import { IUserEntity } from "./user.entity";

export interface IVendorEntity extends IUserEntity {
  vendorId: string;
  category?: ObjectId;
  bio: string;
  place: string;
  averageRating: number;
  totalReviews: number;
}
