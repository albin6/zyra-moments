import { AxiosResponse } from "@/services/auth/authService";
import { getAllCategories } from "@/services/category/categoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllCategoryQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

export const useAllCategoryMutation = (
  mutationFunc: (data: { id?: string; name: string }) => Promise<AxiosResponse>
) => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse,
    Error,
    { id?: string; status: string; name: string }
  >({
    mutationFn: mutationFunc,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
};
