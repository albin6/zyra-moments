import { useQuery } from "@tanstack/react-query";
import { ServicesResponse } from "../service/useService";

export interface CheckoutVendorServicesResponse
  extends Pick<ServicesResponse, "services"> {
  success: true;
}

export const useCheckOutQuery = (
  queryFucn: (vendorId: string) => Promise<CheckoutVendorServicesResponse>,
  vendorId: string
) => {
  return useQuery({
    queryKey: ["checkout-services"],
    queryFn: () => queryFucn(vendorId),
  });
};
