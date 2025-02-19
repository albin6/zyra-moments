import { VendorProfileResponse } from "@/services/client/clientVendorProfileService";
import { useQuery } from "@tanstack/react-query";

export const useClientVendorProifileQuery = (
  queryFunc: (
    vendorId: string,
    currentServicePage: number,
    currentWorkSamplePage: number,
    limit: number
  ) => Promise<VendorProfileResponse>,
  vendorId: string,
  currentServicePage: number,
  currentWorkSamplePage: number,
  limit: number
) => {
  return useQuery({
    queryKey: [
      "vendor-data-client",
      vendorId,
      currentServicePage,
      currentWorkSamplePage,
      limit,
    ],
    queryFn: () =>
      queryFunc(vendorId, currentServicePage, currentWorkSamplePage, limit),
  });
};
