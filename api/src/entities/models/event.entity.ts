import { ObjectId } from "mongoose";

export interface IEventEntity {
  _id?: string | ObjectId;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  pricePerTicket: number;
  ticketLimit: number;
  eventLocation: {
    type: "Point";
    coordinates: number[];
    address: string;
  };
  posterImage?: string;
  hostId: string | ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
