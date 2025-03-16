import { adminAxiosInstance } from "@/api/admin.axios";
import { AxiosResponse } from "../auth/authService";
import { DashboardStats } from "@/hooks/admin/useDashboardStats";

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

export const getAllCategories = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const response = await adminAxiosInstance.get("/_ad/admin/categories", {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data;
};

export type RequestData = {
  success: boolean;
  requests: RequestItem[];
};

export type RequestItem = {
  _id: string;
  vendorId: Vendor;
  categoryId: Category;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Vendor = {
  _id: string;
  firstName: string;
  lastName: string;
};

type Category = {
  _id: string;
  title: string;
};

export const getAllCategoryJoinRequestFromVendors = async () => {
  const response = await adminAxiosInstance.get<RequestData>(
    "/_ad/admin/category/request"
  );
  return response.data;
};

export const updateCategoryJoinRequestStatus = async (data: {
  id: string;
  status: string;
}) => {
  const response = await adminAxiosInstance.patch<AxiosResponse>(
    "/_ad/admin/category/request",
    {},
    {
      params: {
        requestId: data.id,
        status: data.status,
      },
    }
  );
  return response.data;
};

export interface DashboardStatsResponse {
  success: boolean
  stats: DashboardStats
}

export const getDashboardStats = async () => {
  const response = await adminAxiosInstance.get<DashboardStatsResponse>("/_ad/admin/dashboard-stats");
  return response.data;
};
