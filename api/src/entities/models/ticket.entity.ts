import { ObjectId } from "mongoose";

export interface ITicketEntity {
  _id?: string | ObjectId;
  ticketId: string;
  userId: string | ObjectId;
  eventId: string | ObjectId;
  paymentId: string | ObjectId;
  qrCode: string;
  status: "PURCHASED" | "USED" | "CANCELLED";
  isScanned: boolean;
  scannedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
