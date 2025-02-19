import { getBestVendors } from "@/services/vendor/vendorService";
import { useQuery } from "@tanstack/react-query";

export const useBestVendorsQuery = () => {
  return useQuery({
    queryKey: ["best-vendors"],
    queryFn: getBestVendors,
  });
};
