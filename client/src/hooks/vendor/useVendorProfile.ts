import { AxiosResponse } from "@/services/auth/authService";
import {
  getVendorInCategoryStatus,
  vendorJoinCategory,
} from "@/services/category/categoryService";
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

export const useVendorJoinCategoryQuery = () => {
  return useQuery({
    queryKey: ["in-category"],
    queryFn: getVendorInCategoryStatus,
  });
};

export const useVendorJoinCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: vendorJoinCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["in-category"] });
      queryClient.invalidateQueries({ queryKey: ["join-requests"] });
    },
  });
};
