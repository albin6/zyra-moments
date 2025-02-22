import { BookingListFromRepo } from "../../models/booking.entity";

export interface IBookingRepository {
  findByClientId(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<BookingListFromRepo>;
}
