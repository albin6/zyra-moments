export interface Event {
  _id?: string;
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
  hostId: string;
}
