import { model } from "mongoose";
import { bookingSchema } from "../schemas/booking.schema";
import { IBookingEntity } from "../../../entities/models/booking.entity";

export interface IBookingModel extends IBookingEntity, Document {}

export const BookingModel = model<IBookingModel>("Booking", bookingSchema);
