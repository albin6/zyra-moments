import {
  BookingListFromRepo,
  IBookingEntity,
} from "../../models/booking.entity";

export interface IBookingRepository {
  findByUserId(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<BookingListFromRepo>;

  save(data: Partial<IBookingEntity>): Promise<IBookingEntity | null>;

  findById(id: any): Promise<IBookingEntity | null>;

  findByIdAndUpdatePaymentId(id: any, paymentId: any): Promise<void>;

  findByIdAndUpdatePaymentStatus(id: any, status: string): Promise<void>;

  findByIdAndUpdateBookingStatus(id: any, status: string): Promise<void>;
}
