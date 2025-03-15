import { ObjectId } from "mongoose";

export interface PopulatedTicket {
  _id: ObjectId;
  ticketId: string;
  userId: any;
  eventId: {
    _id: any;
    title: string;
    description: string;
    date: Date;
    pricePerTicket: number;
    ticketLimit: number;
    eventLocation: string;
    startTime: string;
    endTime: string;
  };
  qrCode: string;
  isScanned: boolean;
  status: "PURCHASED" | "USED" | "CANCELLED";
}

export interface PaginatedTicket {
  total: number;
  tickets: PopulatedTicket[];
}
