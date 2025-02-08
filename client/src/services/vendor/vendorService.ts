import { vendorAxiosInstance } from "@/api/vendor.axios";
import { UpdatePasswordData } from "@/hooks/client/useClientPassword";
import { AxiosResponse } from "../auth/authService";

export const getVendorDetails = async () => {
  const response = await vendorAxiosInstance.get("/_ve/vendor/profile");
  return response.data;
};

export const updateVendorPassword = async ({
  currentPassword,
  newPassword,
}: UpdatePasswordData) => {
  const response = await vendorAxiosInstance.put<AxiosResponse>(
    "/_ve/vendor/update-password",
    {
      currentPassword,
      newPassword,
    }
  );
  return response.data;
};
