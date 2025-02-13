import { vendorAxiosInstance } from "@/api/vendor.axios";
import { UpdatePasswordData } from "@/hooks/client/useClientPassword";
import { AxiosResponse } from "../auth/authService";
import { WorkSample } from "@/types/WorkSample";

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

export const createNewWorkSample = async (data: WorkSample) => {
  const response = await vendorAxiosInstance.post(
    "/_ve/vendor/work-sample",
    data
  );
  return response.data;
};

export const getAllWorkSampleByVendor = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  const response = await vendorAxiosInstance.get("/_ve/vendor/work-sample", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};
