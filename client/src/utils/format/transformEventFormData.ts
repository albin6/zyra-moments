import { EventFormValues } from "@/components/client/event-hosting/EventForm";
import { Event, PopulatedEvents } from "@/types/Event";

export type TransformedEventData = {
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
    coordinates: number[];
  };
  posterImage: string | null;
};

export const transformEventFormData = (formData: EventFormValues) => {
  return {
    title: formData.title,
    description: formData.description,
    date: formData.date,
    startTime: formData.startTime,
    endTime: formData.endTime,
    pricePerTicket: Number(formData.pricePerTicket),
    ticketLimit: Number(formData.ticketLimit),
    eventLocation: formData.eventLocation || "",
    coordinates: {
      type: "Point",
      coordinates: formData.coordinates
        ? [formData.coordinates.lng, formData.coordinates.lat]
        : [76.300583, 9.983085],
    },
    posterImage: formData.posterImage || null,
  };
};

// ------------------------------------------------------------------------

export type BackendEventData = Event | PopulatedEvents;

export const transformBackendToFormData = (
  backendData: BackendEventData
): EventFormValues => {
  return {
    title: backendData.title,
    description: backendData.description,
    date: new Date(backendData.date),
    startTime: backendData.startTime,
    endTime: backendData.endTime,
    pricePerTicket: backendData.pricePerTicket.toString(),
    ticketLimit: backendData.ticketLimit.toString(),
    eventLocation: backendData.eventLocation,
    coordinates: {
      // Backend stores as [longitude, latitude], form needs {lat, lng}
      lat: backendData.coordinates.coordinates[1],
      lng: backendData.coordinates.coordinates[0],
    },
    posterImage: backendData.posterImage || null,
  };
};
