import { vendorAxiosInstance } from "@/api/vendor.axios";

export const getVendorWalletDetails = async () => {
  const response = await vendorAxiosInstance.get("/_ve/vendor/wallet");
  return response.data;
};
