import { vendorAxiosInstance } from "@/api/vendor.axios";
import { UpdatePasswordData } from "@/hooks/client/useClientPassword";
import { AxiosResponse } from "../auth/authService";
import { WorkSample } from "@/types/WorkSample";

// getting vendor profile details
export const getVendorDetails = async () => {
  const response = await vendorAxiosInstance.get("/_ve/vendor/profile");
  return response.data;
};

// updating vendor profile
export interface IVendorProfileUpdateData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
  place: string;
  profileImage: string;
}
export const updateVendorProfile = async (data: IVendorProfileUpdateData) => {
  const response = await vendorAxiosInstance.put("/_ve/vendor/profile", data);
  return response.data;
};

// password reset
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

// create new work sample
export const createNewWorkSample = async (data: WorkSample) => {
  const response = await vendorAxiosInstance.post(
    "/_ve/vendor/work-sample",
    data
  );
  return response.data;
};

// getting work samples of vendor
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

export const getWorkSampleById = async (id: string) => {
  const response = await vendorAxiosInstance.get(
    `/_ve/vendor/work-sample/${id}`
  );
  return response.data;
};

export const updateWorkSampleById = async (data: {
  id: string;
  data: WorkSample;
}) => {
  const response = await vendorAxiosInstance.put(
    `/_ve/vendor/work-sample/${data.id}`,
    data.data
  );
  return response.data;
};

export const deleteWorkSample = async (id: any) => {
  const response = await vendorAxiosInstance.delete(
    `/_ve/vendor/work-sample/${id}`
  );
  return response.data;
};
