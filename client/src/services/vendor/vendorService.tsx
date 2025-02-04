import { vendorAxiosInstance } from "@/api/private.axios";

export const categoryVendorStatusChecking = async () => {
  const response = await vendorAxiosInstance.get("/categories/vendor-request");
  return response.data;
};

export const vendorDetails = async () => {
  const response = await vendorAxiosInstance.get("/vendors/profile");
  return response.data;
};
