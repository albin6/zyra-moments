import { adminAxiosInstance } from "@/api/admin.axios";

export const getAdminWalletDetails = async () => {
  const response = await adminAxiosInstance.get("/_ad/admin/wallet");
  return response.data;
};
