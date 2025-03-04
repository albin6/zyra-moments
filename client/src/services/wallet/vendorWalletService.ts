import { vendorAxiosInstance } from "@/api/vendor.axios";
import { WalletDetailsResponse } from "./clientWalletService";

export const getVendorWalletDetails =
  async (): Promise<WalletDetailsResponse> => {
    const response = await vendorAxiosInstance.get("/_ve/vendor/wallet");
    return response.data;
  };
