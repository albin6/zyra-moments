export interface Event {
  _id?: string;
  title: string;
  description: string;
  date: Date;
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
  hostId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PopulatedEvents extends Omit<Event, "hostId"> {
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    phoneNumber: string;
  };
}


export interface PopulatedEvent {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  status: boolean;
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
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    phoneNumber: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaginatedEvents {
  success: boolean;
  events: PopulatedEvent[];
  totalPages: number;
  currentPage: number;
}