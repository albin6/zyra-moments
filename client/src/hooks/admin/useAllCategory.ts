import { AxiosResponse } from "@/services/auth/authService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  totalCategory: number;
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

export const useAllCategoryMutation = (
  mutationFunc: (data: {
    id?: string;
    status?: string;
    name?: string;
  }) => Promise<AxiosResponse>
) => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse,
    Error,
    { id?: string; status?: string; name?: string }
  >({
    mutationFn: mutationFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paginated-categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
