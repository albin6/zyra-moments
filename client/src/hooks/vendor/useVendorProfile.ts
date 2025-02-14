import { AxiosResponse } from "@/services/auth/authService";
import { vendorJoinCategory } from "@/services/category/categoryService";
import {
  getVendorDetails,
  IVendorProfileUpdateData,
  updateVendorProfile,
} from "@/services/vendor/vendorService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useVendorProfileQuery = () => {
  return useQuery({
    queryKey: ["vendor-profile"],
    queryFn: getVendorDetails,
  });
};

export const useVendorProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, Error, IVendorProfileUpdateData>({
    mutationFn: updateVendorProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["vendor-profile"] }),
  });
};

export const useVendorJoinCategoryMutation = () => {
  return useMutation({
    mutationFn: vendorJoinCategory,
  });
};
