import { getDashboardStats } from "@/services/admin/adminService";
import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  totalActiveEvents: number;
  totalActiveClients: number;
  totalActiveVendors: number;
  totalActiveCategories: number;
  timestamp: Date;
}

export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => getDashboardStats(),
  });
};
