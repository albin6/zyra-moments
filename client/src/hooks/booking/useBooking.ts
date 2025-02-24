import { BookingList } from "@/components/client/ClientBookingList";
import { useQuery } from "@tanstack/react-query";

interface FetchBookingsParams {
  page: number;
  limit: number;
  sort: string;
  search: string;
}

type BookingResponse = {
  bookings: BookingList[];
  totalPages: number;
  currentPage: number;
};

export const useBookingClientQuery = (
  queryFunc: (params: FetchBookingsParams) => Promise<BookingResponse>,
  page: number,
  limit: number,
  sort: string,
  search: string
) => {
  return useQuery({
    queryKey: ["paginated-booking", page, limit, sort],
    queryFn: () => queryFunc({ page, limit, sort, search }),
    placeholderData: (prevData) => prevData,
  });
};
