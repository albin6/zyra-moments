import { BookingListFromRepo } from "../../models/booking.entity";

export interface IGetAllBookingUseCase {
  execute(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    searchTermString: string
  ): Promise<BookingListFromRepo>;
}
