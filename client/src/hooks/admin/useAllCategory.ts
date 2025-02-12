import { useQuery } from "@tanstack/react-query";

interface FetchCategoryParams {
  page: number;
  limit: number;
  search: string;
}

export interface CategoryType {
  _id: any;
  title: string;
  status: boolean;
}

type CategoryResponse = {
  categories: CategoryType[];
  totalPages: number;
  currentPage: number;
};

export const useAllCategoryAdminQuery = (
  queryFunc: (params: FetchCategoryParams) => Promise<CategoryResponse>,
  page: number,
  limit: number,
  search: string
) => {
  return useQuery({
    queryKey: ["paginated-categories", page, limit, search],
    queryFn: () => queryFunc({ page, limit, search }),
    placeholderData: (prevData) => prevData,
  });
};
