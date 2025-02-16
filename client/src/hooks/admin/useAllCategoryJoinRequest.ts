import {
  getAllCategoryJoinRequestFromVendors,
  updateCategoryJoinRequestStatus,
} from "@/services/admin/adminService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllCategoryJoinRequestQuery = () => {
  return useQuery({
    queryKey: ["join-requests"],
    queryFn: getAllCategoryJoinRequestFromVendors,
  });
};

export const useAllJoinCategoryRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategoryJoinRequestStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["join-requests"] });
      queryClient.invalidateQueries({ queryKey: ["in-category"] });
    },
  });
};
