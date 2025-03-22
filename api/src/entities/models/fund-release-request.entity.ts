import { Schema } from "mongoose";

export interface IFundReleaseRequestEntity {
  requestId: string;
  eventId: Schema.Types.ObjectId;
  organizerId: Schema.Types.ObjectId;
  totalAmount: number;
  ticketSalesCount: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "RELEASED";
  requestedAt: Date;
  processedAt?: Date;
  adminNotes?: string;
}
