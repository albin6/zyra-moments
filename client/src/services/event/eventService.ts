import { clientAxiosInstance } from "@/api/client.axios";
import { EventQueryParams } from "@/hooks/event/useEvent";
import { PopulatedEvents } from "@/types/Event";
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

export const getUpcomingEvents = async () => {
  const response = await clientAxiosInstance.get("/_host/client/upcomings");
  return response.data;
};
