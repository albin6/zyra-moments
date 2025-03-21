import type React from "react";
import { useEffect, useState } from "react";
import {
  Plus,
  FolderTree,
  FileQuestion,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import ViewCatgoryRequestModal from "../modals/AdminViewCategoryRequestModal";
import Pagination from "../Pagination";

import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CategoryType,
  useAllCategoryAdminQuery,
  useAllCategoryMutation,
} from "@/hooks/admin/useAllCategory";
import { getAllCategories } from "@/services/admin/adminService";
import { Spinner } from "../ui/spinner";
import { addAndEditCategory } from "@/services/category/categoryService";
import { ConfirmationModal } from "../modals/ConfirmationModal";

const CategoryManagement: React.FC = () => {
  const [categoryIdToBlock, setCategoryIdToBlock] = useState<string | null>(
    null
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[] | null>(null);

  const [page, setPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;

  const handleAddCategory = (newCategory: string) => {
    mutateCategory(
      { name: newCategory },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  const updateCategoryStatus = (id: string) => {
    mutateCategory(
      { id, status: "updated" },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  const { data, isLoading } = useAllCategoryAdminQuery(
    getAllCategories,
    page,
    limit,
    ""
  );

  const { mutate: mutateCategory } = useAllCategoryMutation(addAndEditCategory);

  useEffect(() => {
    if (!data) return;
    setCategories(data.categories);
    setTotalPages(data.totalPages);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .trim()
        .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed.")
        .min(3, "Category name must be at least 3 characters.")
        .max(30, "Category name must not exceed 30 characters.")
        .required("Category name is required."),
    }),
    onSubmit: (values, { resetForm }) => {
      handleAddCategory(values.categoryName);
      resetForm();
    },
  });

  const onUpdateStatus = () => {
    if (categoryIdToBlock) {
      updateCategoryStatus(categoryIdToBlock);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!categories) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Card className="w-full">
        <div className="p-4 sm:p-6 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Category Management
          </h1>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Categories
                </CardTitle>
                <FolderTree className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data && data.totalCategory}
                </div>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Events
                </CardTitle>
                <FileQuestion className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                 0
                </div>
              </CardContent>
            </Card> */}
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Add New Category
                </CardTitle>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
                >
                  <div className="flex-grow">
                    <Input
                      type="text"
                      name="categoryName"
                      placeholder="Category name"
                      value={formik.values.categoryName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full ${
                        formik.touched.categoryName &&
                        formik.errors.categoryName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.categoryName &&
                      formik.errors.categoryName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.categoryName}
                        </p>
                      )}
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Add
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
              <CardDescription>Manage your event categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[310px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category ID</TableHead>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Category Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category, index) => (
                      <TableRow key={category._id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {category.title}
                        </TableCell>
                        <TableCell>
                          {category.status ? "active" : "inactive"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCategoryIdToBlock(category._id);
                              setIsConfirmationModalOpen(true);
                            }}
                          >
                            {!category.status ? (
                              <>
                                <ToggleLeft className="h-4 w-4" />
                                <span className="sr-only">Block</span>
                              </>
                            ) : (
                              <>
                                <ToggleRight className="h-4 w-4" />
                                <span className="sr-only">Unblock</span>
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center sm:justify-start">
            <ViewCatgoryRequestModal />
          </div>
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={() => setIsConfirmationModalOpen(false)}
            onConfirm={() => {
              onUpdateStatus();
              setCategoryIdToBlock(null);
            }}
            title="Confirm Action"
            message="Are you sure you want to perform this action?"
            confirmText="Yes, I'm sure"
            cancelText="No, cancel"
          />
        </div>
      </Card>
    </div>
  );
};

export default CategoryManagement;
