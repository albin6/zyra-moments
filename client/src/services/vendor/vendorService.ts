import { vendorAxiosInstance } from "@/api/vendor.axios";

export const getVendorDetails = async () => {
  const response = await vendorAxiosInstance.get("/_ve/vendor/profile");
  return response.data;
};
