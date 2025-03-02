import { AuthResponse } from "@/services/auth/authService";
import {
  getEventDetails,
  PaginatedHostedEventsResponse,
} from "@/services/event/eventService";
import { TransformedEventData } from "@/utils/format/transformEventFormData";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useEventMutation = (
  mutationFunc: (data: TransformedEventData) => Promise<AuthResponse>
) => {
  return useMutation({
    mutationFn: mutationFunc,
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
    queryKey: ["hosted-events"],
    queryFn: () => queryFunc({ page, limit }),
  });
};
