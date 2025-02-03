import { getAllCatgories } from "@/services/auth/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useAllCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCatgories,
  });
};
