import { clientAxiosInstance } from "@/api/client.axios";
import { PopulatedWallet } from "@/types/Wallet";

export const getClientWalletDetails = async (): Promise<PopulatedWallet> => {
  const response = await clientAxiosInstance.get("/_cl/client/wallet");
  return response.data;
};
