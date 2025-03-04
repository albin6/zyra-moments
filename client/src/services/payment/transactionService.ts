import { adminAxiosInstance } from "@/api/admin.axios";
import { clientAxiosInstance } from "@/api/client.axios";
import { vendorAxiosInstance } from "@/api/vendor.axios";
import { PopulatedPaymentsResponse } from "@/types/Payment";

export const getAllTransactionsByClientId =
  async (): Promise<PopulatedPaymentsResponse> => {
    const response = await clientAxiosInstance.get("/_cl/client/transactions");
    return response.data;
  };

export const getAllTransactionsByVendorId =
  async (): Promise<PopulatedPaymentsResponse> => {
    const response = await vendorAxiosInstance.get("/_ve/vendor/transactions");
    return response.data;
  };

export const getAllTransactionsByAdminId =
  async (): Promise<PopulatedPaymentsResponse> => {
    const response = await adminAxiosInstance.get("/_ad/admin/transactions");
    return response.data;
  };
