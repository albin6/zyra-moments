import { adminAxiosInstance } from "@/api/admin.axios";
import { WalletDetailsResponse } from "./clientWalletService";

export const getAdminWalletDetails =
  async (): Promise<WalletDetailsResponse> => {
    const response = await adminAxiosInstance.get("/_ad/admin/wallet");
    return response.data;
  };
