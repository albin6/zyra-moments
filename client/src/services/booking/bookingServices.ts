import { adminAxiosInstance } from "@/api/admin.axios";
import { clientAxiosInstance } from "@/api/client.axios";
import { vendorAxiosInstance } from "@/api/vendor.axios";

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
  statusFilter: string;
}) => {
  const response = await clientAxiosInstance.get(
    "/_cl/client/client-bookings",
    {
      params: {
        page: data.page,
        limit: data.limit,
        sort: data.sort,
        search: data.search,
        statusFilter: data.statusFilter,
      },
    }
  );
  return response.data;
};

export const getClientBookingsInAdmin = async (data: {
  page: number;
  limit: number;
  sort: string;
  search: string;
  statusFilter?: string;
}) => {
  const response = await adminAxiosInstance.get(
    "/_ad/admin/client-bookings",
    {
      params: {
        page: data.page,
        limit: data.limit,
        sort: data.sort,
        search: data.search,
        statusFilter: data.statusFilter,
      },
    }
  );
  return response.data;
};

export const getVendorBookings = async (data: {
  page: number;
  limit: number;
  sort: string;
  search: string;
  statusFilter: string;
}) => {
  const response = await vendorAxiosInstance.get(
    "/_ve/vendor/vendor-bookings",
    {
      params: {
        page: data.page,
        limit: data.limit,
        sort: data.sort,
        search: data.search,
        statusFilter: data.statusFilter,
      },
    }
  );
  return response.data;
};

export const clientUpdateBookingStatus = async ({
  bookingId,
  status,
}: {
  bookingId: any;
  status: string;
}) => {
  const response = await clientAxiosInstance.patch(
    "/_cl/client/booking/status",
    {},
    {
      params: {
        bookingId,
        status,
      },
    }
  );
  return response.data;
};

export const vendorUpdateBookingStatus = async ({
  bookingId,
  status,
}: {
  bookingId: any;
  status: string;
}) => {
  const response = await vendorAxiosInstance.patch(
    "/_ve/vendor/booking/status",
    {},
    {
      params: {
        bookingId,
        status,
      },
    }
  );
  return response.data;
};
