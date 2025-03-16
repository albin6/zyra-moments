import { ObjectId } from "mongoose";

export interface IEventEntity {
  _id?: string | ObjectId;
  title: string;
  description: string;
  date: Date;
  status: boolean
  startTime: string;
  endTime: string;
  pricePerTicket: number;
  ticketLimit: number;
  eventLocation: string;
  coordinates: {
    type: "Point";
    coordinates: number[];
  };
  posterImage?: string;
  hostId: string | ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PopulatedEvents extends Omit<IEventEntity, "hostId"> {
  hostId: {
    _id: ObjectId | string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    phoneNumber: string;
  };
}

export interface PaginatedEvents {
  events: PopulatedEvents[];
  total: number;
}

export interface EventFilterParams {
  pageNumber: number;
  pageSize: number;
  searchString: string;
  parsedStatus: boolean | undefined
  dateValue?: Date;
}
