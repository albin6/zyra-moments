import { IBookingEntity } from "./booking.entity";
import { IClientEntity } from "./client.entity";
import { IVendorEntity } from "./vendor.entity";

export interface IReviewEntity {
  bookingId: string;
  reviewId: string;
  clientId: string;
  vendorId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedReview {
  bookingId: IBookingEntity;
  reviewId: string;
  clientId: IClientEntity;
  vendorId: IVendorEntity;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewListFromRepo {
  reviews: PopulatedReview[];
  total: number;
}