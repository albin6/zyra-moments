import { getAllCategoryJoinRequestFromVendors } from "@/services/admin/adminService";
import { useQuery } from "@tanstack/react-query";

export const useAllCategoryJoinRequestQuery = () => {
  return useQuery({
    queryKey: ["join-requests"],
    queryFn: getAllCategoryJoinRequestFromVendors,
  });
};
