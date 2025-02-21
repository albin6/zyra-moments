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
