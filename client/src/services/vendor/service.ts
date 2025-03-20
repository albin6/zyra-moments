import { vendorAxiosInstance } from "@/api/vendor.axios";
import { Service } from "@/types/Service";

export const createService = async (data: Service) => {
  const response = await vendorAxiosInstance.post("/_ve/vendor/services", data);
  return response.data;
};

export const getAllServices = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  const response = await vendorAxiosInstance.get("/_ve/vendor/services", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export interface SingleServiceResponse {
  success: boolean;
  service: Service;
}

export const getServiceById = async (
  id: any
): Promise<SingleServiceResponse> => {
  const response = await vendorAxiosInstance.get(`/_ve/vendor/services/${id}`);
  return response.data;
};

export const updateServiceById = async (data: {
  id: any;
  service: Service;
}) => {
  delete data.service._id
  const response = await vendorAxiosInstance.put(
    `/_ve/vendor/services/${data.id}`,
    data.service
  );
  return response.data;
};
