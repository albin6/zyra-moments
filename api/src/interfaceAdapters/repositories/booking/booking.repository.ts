import { injectable } from "tsyringe";
import {
  BookingListFromRepo,
  IBookingEntity,
} from "../../../entities/models/booking.entity";
import { IBookingRepository } from "../../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingModel } from "../../../frameworks/database/models/booking.model";

@injectable()
export class BookingRepository implements IBookingRepository {
  async findByUserId(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<BookingListFromRepo> {
    const [bookings, total] = await Promise.all([
      BookingModel.find(filter)
        .populate({ path: "vendorId", select: "firstName lastName" })
        .sort(sort)
        .skip(skip)
        .limit(limit),
      BookingModel.countDocuments(filter),
    ]);

    return {
      bookings,
      total,
    };
  }

  async save(data: Partial<IBookingEntity>): Promise<IBookingEntity> {
    return await BookingModel.create(data);
  }

  async findByIdAndUpdatePaymentId(id: any, paymentId: any): Promise<void> {
    await BookingModel.findByIdAndUpdate(id, { $set: { paymentId } });
  }
}
