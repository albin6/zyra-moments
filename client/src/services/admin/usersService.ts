import { adminAxiosInstance } from "@/api/private.axios";

export const getAllUsersByType = async (userType: string) => {
  const response = await adminAxiosInstance.get("/users", {
    params: { userType },
  });
  return response.data;
};
