import { vendorJoinCategory } from "@/services/category/categoryService";
import { getVendorDetails } from "@/services/vendor/vendorService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useVendorProfileQuery = () => {
  return useQuery({
    queryKey: ["vendorProfile"],
    queryFn: getVendorDetails,
  });
};

export const useVendorJoinCategoryMutation = () => {
  return useMutation({
    mutationFn: vendorJoinCategory,
  });
};
