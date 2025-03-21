import { adminAxiosInstance } from "@/api/admin.axios";
import { clientAxiosInstance } from "@/api/client.axios";
import { EventQueryParams } from "@/hooks/event/useEvent";
import { PaginatedEvents, PopulatedEvents } from "@/types/Event";
import { TransformedEventData } from "@/utils/format/transformEventFormData";

export const hostNewEvent = async (data: TransformedEventData) => {
  const response = await clientAxiosInstance.post(
    "/_host/client/host-event",
    data
  );
  return response.data;
};

export const editHostEvent = async (event: { id: string; data: any }) => {
  console.log(event);
  const response = await clientAxiosInstance.put("/_host/client/host-event", {
    eventId: event.id,
    eventData: event.data,
  });
  return response.data;
};

export const getEventDetails = async (
  id: any
): Promise<{ success: boolean; event: PopulatedEvents }> => {
  const response = await clientAxiosInstance.get(
    "/_host/client/host-event/details",
    {
      params: {
        eventId: id,
      },
    }
  );
  return response.data;
};

export interface PaginatedHostedEventsResponse {
  success: true;
  events: PopulatedEvents[];
  totalPages: number;
  currentPage: number;
}

export const getAllHostedEventsByClient = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): Promise<PaginatedHostedEventsResponse> => {
  const response = await clientAxiosInstance.get("_host/client/hosted-event", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getAllHostedEvents = async (params: EventQueryParams = {}) => {
  const response = await clientAxiosInstance.get(
    "/_host/client/discover-events",
    {
      params: {
        page: params.page || 1,
        limit: params.limit || 6,
        search: params.search || "",
        category: params.category || "",
        priceMin: params.priceMin,
        priceMax: params.priceMax,
        sortField: params.sortField || "date",
        sortOrder: params.sortOrder || "desc",
        nearby: params.nearby || false, // Include geospatial flag
        longitude: params.longitude, // Include user's longitude
        latitude: params.latitude, // Include user's latitude
        maxDistance: params.maxDistance || 10000, // Default to 10km if not provided
      },
    }
  );

  return response.data;
};


interface Coordinates {
  type: "Point";
  coordinates: [number, number];
}

interface Host {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface Event {
  coordinates: Coordinates;
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  pricePerTicket: number;
  ticketLimit: number;
  eventLocation: string;
  posterImage: string;
  hostId: Host;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: boolean;
}

export interface EventResponse {
  success: boolean;
  events: PopulatedEvents[]
}


export const getUpcomingEvents = async () => {
  const response = await clientAxiosInstance.get<EventResponse>("/_host/client/upcomings");
  return response.data;
};

export const getUpcomingEventsForAdmin = async () => {
  const response = await adminAxiosInstance.get<EventResponse>("/_host/admin/upcomings");
  return response.data;
};

export const getPaginatedEvents = async (
  page: number,
  limit: number,
  search: string,
  status: string,
  date?: Date
) => {
  const newStatus = status === "all" ? "" : status === "active" ? true : false;
  const response = await adminAxiosInstance.get<PaginatedEvents>(
    "/_ad/admin/events",
    {
      params: { page, limit, search, date, status: newStatus },
    }
  );
  return response.data;
};
