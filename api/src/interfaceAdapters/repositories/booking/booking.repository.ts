import { injectable } from "tsyringe";
import {
  BookingListFromRepo,
  IBookingEntity,
} from "../../../entities/models/booking.entity";
import { IBookingRepository } from "../../../entities/repositoryInterfaces/booking/booking-repository.interface";
import {
  BookingModel,
  IBookingModel,
} from "../../../frameworks/database/models/booking.model";

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
        .populate({ path: "userId", select: "firstName lastName" })
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

  async findById(id: any): Promise<IBookingEntity | null> {
    return await BookingModel.findById(id);
  }

  async save(data: Partial<IBookingEntity>): Promise<IBookingEntity> {
    return await BookingModel.create(data);
  }

  async findByIdAndUpdatePaymentId(id: any, paymentId: any): Promise<void> {
    await BookingModel.findByIdAndUpdate(id, { $set: { paymentId } });
  }

  async findByIdAndUpdatePaymentStatus(id: any, status: string): Promise<void> {
    await BookingModel.findByIdAndUpdate(id, {
      $set: { paymentStatus: status },
    });
  }

  async findByIdAndUpdateBookingStatus(id: any, status: string): Promise<void> {
    await BookingModel.findByIdAndUpdate(id, { $set: { status } });
  }

  async findByClientIdAndVendorId(
    clientId: any,
    vendorId: any
  ): Promise<IBookingEntity | null> {
    return await BookingModel.findOne({ userId: clientId, vendorId }).exec();
  }

  async updateClientApproved(id: any): Promise<IBookingEntity | null> {
    return await BookingModel.findOneAndUpdate(
      { userId: id },
      { $set: { isClientApproved: true } },
      { new: true }
    );
  }

  async updateVendorApproved(id: any): Promise<IBookingEntity | null> {
    return await BookingModel.findOneAndUpdate(
      { vendorId: id },
      { $set: { isVendorApproved: true } },
      { new: true }
    );
  }

  async isBothApproved(bookingId: any): Promise<IBookingEntity | null> {
    return await BookingModel.findOne({
      _id: bookingId,
      isClientApproved: true,
      isVendorApproved: true,
    });
  }

  async find(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<BookingListFromRepo> {
    console.log('inside booking repositoy find', filter, sort, skip, limit)
    const [bookings, total] = await Promise.all([
      BookingModel.find(filter)
        .populate({ path: "vendorId", select: "firstName lastName" })
        .populate({ path: "userId", select: "firstName lastName" })
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

  // latest for chat
  async findByClientId(clientId: any): Promise<IBookingModel[]> {
    return await BookingModel.find({ userId: clientId })
      .populate(
        "vendorId",
        "firstName lastName email profileImage onlineStatus"
      )
      .exec();
  }

  async findByVendorId(vendorId: any): Promise<IBookingModel[]> {
    return await BookingModel.find({ vendorId })
      .populate("userId", "firstName lastName email profileImage onlineStatus")
      .exec();
  }
}
