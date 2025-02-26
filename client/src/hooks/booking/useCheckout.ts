import { useQuery } from "@tanstack/react-query";
import { ServicesResponse } from "../service/useService";

export interface CheckoutVendorServicesResponse
  extends Pick<ServicesResponse, "services"> {
  success: boolean;
  vendor: {
    _id: string;
    firstName: string;
    lastName: string;
    place: string;
    averageRating: number;
    profileImage: string;
    category: {
      _id: string;
      title: string;
    };
  };
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
