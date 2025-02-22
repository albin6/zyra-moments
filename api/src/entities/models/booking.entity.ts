import { ObjectId } from "mongoose";

export interface IBookingEntity {
  userId?: string | ObjectId;
  vendorId?: string | ObjectId;

  serviceDetails: {
    serviceTitle: string;
    serviceDescription: string;
    serviceDuration: number;
    servicePrice: number;
    additionalHoursPrice: number;
    cancellationPolicies: string[];
    termsAndConditions: string[];
  };

  bookingDate: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };

  totalPrice: number;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  status: "confirmed" | "cancelled" | "completed";

  createdAt: Date;
}

export interface BookingListData {
  _id: string | ObjectId;
  clientName: string;
  serviceRequired: string;
  requiredDate: string;
  totalPrice: number;
  status: string;
}

export interface BookingListFromRepo {
  bookings: IBookingEntity[];
  total: number;
}

export interface BookingListFromUseCase {
  bookings: BookingListData[];
  total: number;
}
