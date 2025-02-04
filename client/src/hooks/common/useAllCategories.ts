import { categoryVendorStatusChecking } from "@/services/vendor/vendorService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllCategoriesQuery = (queryFunc: any) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => queryFunc(),
  });
};

export const useCategoryRequestedQuery = () => {
  return useQuery({
    queryKey: ["requestedOrNot"],
    queryFn: categoryVendorStatusChecking,
  });
};

export const useAllCategoriesMutations = <T>(
  mutationFunc: (data: T) => Promise<any>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutationFunc,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      }),
  });
};
