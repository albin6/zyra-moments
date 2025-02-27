import { ObjectId } from "mongoose";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "succeeded"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type Purpose = "vendor-booking" | "role-upgrade" | "ticket-purchase";

export interface IPaymentEntity {
  _id?: string | ObjectId;
  userId: string | ObjectId;
  bookingId?: string | ObjectId;
  transactionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentIntentId?: string;
  purpose: Purpose;
  createdAt?: Date;
  updatedAt?: Date;
}
