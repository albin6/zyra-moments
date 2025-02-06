import { getAllCategories } from "@/services/category/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useAllCategoryQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
