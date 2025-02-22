import { injectable } from "tsyringe";
import { BookingListFromRepo } from "../../../entities/models/booking.entity";
import { IBookingRepository } from "../../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingModel } from "../../../frameworks/database/models/booking.model";

@injectable()
export class BookingRepository implements IBookingRepository {
  async findByClientId(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<BookingListFromRepo> {
    const [bookings, total] = await Promise.all([
      BookingModel.find(filter).sort(sort).skip(skip).limit(limit),
      BookingModel.countDocuments(filter),
    ]);

    return {
      bookings,
      total,
    };
  }
}
