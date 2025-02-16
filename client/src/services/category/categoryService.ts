import { adminAxiosInstance } from "@/api/admin.axios";
import { clientAxiosInstance } from "@/api/client.axios";
import { vendorAxiosInstance } from "@/api/vendor.axios";

export type Category = {
  _id: string;
  categoryId: string;
  status: boolean;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface CategoryResponse {
  success: boolean;
  categories: Category[];
}

export const getAllCategories = async () => {
  const response = await vendorAxiosInstance.get<CategoryResponse>(
    "/_ve/vendor/categories"
  );
  return response.data;
};

export const getAllCategoriesForClient = async () => {
  const response = await clientAxiosInstance.get<CategoryResponse>(
    "/_cl/client/categories"
  );
  return response.data;
};

export const vendorJoinCategory = async (category: string) => {
  const response = await vendorAxiosInstance.post(
    "/_ve/vendor/categories/join",
    {
      category,
    }
  );

  return response.data;
};

export const getVendorInCategoryStatus = async () => {
  const response = await vendorAxiosInstance.get<{
    success: boolean;
    status: string | undefined;
  }>("/_ve/vendor/category/status");
  return response.data;
};

export const addAndEditCategory = async (categoryData: {
  id?: string;
  status?: string;
  name?: string;
}) => {
  if (categoryData.id) {
    if (categoryData.status) {
      const response = await adminAxiosInstance.patch(
        `/_ad/admin/categories/${categoryData.id}`
      );
      return response.data;
    } else {
      const response = await adminAxiosInstance.put(
        `/_ad/admin/categories/${categoryData.id}`,
        categoryData
      );
      return response.data;
    }
  } else {
    const response = await adminAxiosInstance.post(
      "/_ad/admin/categories",
      categoryData
    );
    return response.data;
  }
};
