import { clientAxiosInstance } from "@/api/client.axios";

export const getServicesOfAVendor = async (vendorId: string) => {
  const response = await clientAxiosInstance.get(
    "/_cl/client/vendor-services",
    {
      params: {
        vendorId,
      },
    }
  );
  return response.data;
};

export const getClientBookings = async (data: {
  page: number;
  limit: number;
  sort: string;
  search: string;
}) => {
  const response = await clientAxiosInstance.get(
    "/_cl/client/client-bookings",
    {
      params: {
        page: data.page,
        limit: data.limit,
        sort: data.sort,
        search: data.search,
      },
    }
  );
  return response.data;
};
