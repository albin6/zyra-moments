import { privateAxiosInstance } from "@/api/private.axios";

export const getAllCatgories = async () => {
  const response = await privateAxiosInstance.get("/categories");
  return response.data;
};
