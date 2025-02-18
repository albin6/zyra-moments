import { clientAxiosInstance } from "@/api/client.axios";

export const getVendorListingBasedOnCategory = async (data: {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  categoryId: any;
}) => {
  const response = await clientAxiosInstance.get(
    `/_cl/client/vendors/${data.categoryId}/listing`,
    {
      params: {
        page: data.page,
        limit: data.limit,
        search: data.search,
        sortBy: data.sortBy,
      },
    }
  );
  return response.data;
};
