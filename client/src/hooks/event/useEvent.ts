import { AuthResponse } from "@/services/auth/authService";
import {
  getAllHostedEvents,
  getEventDetails,
  getUpcomingEvents,
  PaginatedHostedEventsResponse,
} from "@/services/event/eventService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Event {
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
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  coordinates?: {
    type: string;
    coordinates: number[];
  };
  createdAt: string;
  updatedAt: string;
}

// Define the interface for query parameters
export interface EventQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sortField?: "date" | "title" | "pricePerTicket";
  sortOrder?: "asc" | "desc";
}

// Response interface from the backend
export interface EventListResponse {
  events: Event[];
  pagination: {
    totalEvents: number;
    totalPages: number;
    currentPage: number;
  };
}

export const useEventMutation = (
  mutationFunc: (data: any) => Promise<AuthResponse>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutationFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hosted-events"] });
    },
  });
};

export const useEventQuery = (id: any) => {
  return useQuery({
    queryKey: ["hosted-single-event"],
    queryFn: () => getEventDetails(id),
  });
};

export const useAllHostedEvents = (
  queryFunc: (data: {
    page: number;
    limit: number;
  }) => Promise<PaginatedHostedEventsResponse>,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["hosted-events", page, limit],
    queryFn: () => queryFunc({ page, limit }),
  });
};

export const useEventListing = (params: EventQueryParams = {}) => {
  return useQuery<EventListResponse, Error>({
    queryKey: ["events", params],
    queryFn: () => getAllHostedEvents(params),
  });
};

export const useUpcomingEventsQuery = () => {
  return useQuery({
    queryKey: ["upcomings"],
    queryFn: getUpcomingEvents,
  });
};
