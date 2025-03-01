import { EventFormValues } from "@/components/client/event-hosting/EventForm";

export type TransformedEventData = {
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
