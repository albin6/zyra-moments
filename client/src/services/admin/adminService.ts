import { adminAxiosInstance } from "@/api/admin.axios";

export const getAllUsers = async ({
  userType,
  page = 1,
  limit = 10,
  search = "",
}: {
  userType: string;
  page: number;
  limit: number;
  search: string;
}) => {
  const response = await adminAxiosInstance.get("/_ad/admin/users", {
    params: {
      userType,
      page,
      limit,
      search,
    },
  });
  return response.data;
};

export const updateUserStatus = async (data: {
  userType: string;
  userId: any;
}) => {
  const response = await adminAxiosInstance.patch(
    "_ad/admin/user-status",
    {},
    {
      params: {
        userType: data.userType,
        userId: data.userId,
      },
    }
  );
  return response.data;
};
