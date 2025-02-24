import { useQuery } from "@tanstack/react-query";

interface FetchVendorsParams {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  categoryId: string;
}

export interface VendorsListType {
  _id: any;
  firstName: string;
  lastName: string;
  profileImage: string;
  averageRating: number;
}

type VendorsListResponse = {
  vendors: VendorsListType[];
  totalPages: number;
  currentPage: number;
  totalCategory: number;
};

export const useVendorsListing = (
  queryFunc: (params: FetchVendorsParams) => Promise<VendorsListResponse>,
  page: number,
  limit: number,
  search: string,
  sortBy: string,
  categoryId: string
) => {
  return useQuery({
    queryKey: ["vendor-listing", page, limit, search, sortBy],
    queryFn: () => queryFunc({ page, limit, search, sortBy, categoryId }),
    placeholderData: (prevData) => prevData,
  });
};
