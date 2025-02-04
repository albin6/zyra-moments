import { adminAxiosInstance, vendorAxiosInstance } from "@/api/private.axios";

export interface Category {
  _id: string;
  categoryId: string;
  status: boolean;
  title: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface CategoryResponseModel {
  message: string;
  categories: Category[] | [];
}

export const getAllCatgories = async () => {
  const response = await vendorAxiosInstance.get<CategoryResponseModel>(
    "/categories"
  );
  return response.data;
};

export const getAllCatgoriesAdmin = async () => {
  const response = await adminAxiosInstance.get<CategoryResponseModel>(
    "/categories"
  );
  return response.data;
};

export const joinCategory = async (categoryId: string) => {
  const response = await vendorAxiosInstance.post("/categories/join", {
    categoryId,
  });
  return response.data;
};

export const createCategory = async (title: string) => {
  const response = await adminAxiosInstance.post("/categories", { title });
  return response.data;
};
