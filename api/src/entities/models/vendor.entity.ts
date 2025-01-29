import { IUserEntity } from "./user.entity";

export interface IVendorEntity extends IUserEntity {
  vendorId: string;
  category: string;
  bio: string;
  place: string;
  averageRating: number;
  totalReviews: number;
  requestStatus: string;
}
