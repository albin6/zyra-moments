import { CategoryResponse } from "@/services/category/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useAllCategoryQuery = (
  queryFunc: () => Promise<CategoryResponse>
) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => queryFunc(),
  });
};
