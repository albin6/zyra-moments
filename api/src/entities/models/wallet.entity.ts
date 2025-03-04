import { ObjectId } from "mongoose";
import { PaymentStatus, Purpose } from "./payment.entity";

export interface IWalletEntity {
  _id?: string | ObjectId;
  userId: string | ObjectId;
  userType: "Client" | "Vendor" | "Admin";
  paymentId: string[] | ObjectId[];
  role: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PopulatedWallet
  extends Omit<IWalletEntity, "userId" | "paymentId"> {
  userId: {
    _id: string | ObjectId;
    firstName: string;
    lastName: string;
    email: string;
  };
  paymentId: {
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
  }[];
}
