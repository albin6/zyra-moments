export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum Purpose {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  PAYMENT = "PAYMENT",
  REFUND = "REFUND",
}

export interface IWalletEntity {
  _id?: string;
  userId: string;
  paymentId: string[];
  role: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PopulatedWallet
  extends Omit<IWalletEntity, "userId" | "paymentId"> {
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  paymentId: {
    _id: string;
    transactionId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentIntentId?: string;
    purpose: Purpose;
  }[];
}
