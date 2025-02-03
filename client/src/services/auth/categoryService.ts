import { adminAxiosInstance } from "@/api/private.axios";

export const getAllCatgories = async () => {
  const response = await adminAxiosInstance.get("/categories");
  return response.data;
};
