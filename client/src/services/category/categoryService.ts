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
    status: boolean;
  }>("/_ve/vendor/category/status");
  return response.data;
};
