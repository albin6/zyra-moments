import type React from "react";
import { useEffect, useState } from "react";
import { Plus, FolderTree, FileQuestion, Trash2 } from "lucide-react";
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
import {
  useAllCategoriesMutations,
  useAllCategoriesQuery,
} from "@/hooks/common/useAllCategories";
import {
  Category,
  createCategory,
  getAllCatgoriesAdmin,
} from "@/services/common/categoryService";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";

const ITEMS_PER_PAGE = 10;

const CategoryManagement: React.FC = () => {
  // const [categories, setCategories] = useState(mockCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const { data, refetch } = useAllCategoriesQuery(getAllCatgoriesAdmin);

  const { mutate: createNewCategory } =
    useAllCategoriesMutations(createCategory);

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  const handleAddCategory = (newCategory: string) => {
    createNewCategory(newCategory, {
      onSuccess: (data) => {
        toast.success(data.message);
        refetch();
      },
      onError: (error: any) => toast.error(error.response.data.message),
    });
  };

  const updateCategoryStatus = (id: string) => {};

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
      resetForm(); // Clear the input after submission
    },
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Category Management
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* {categories.reduce(
                (sum, category) => sum + category.eventsCount,
                0
              )} */}
              0
            </div>
          </CardContent>
        </Card>
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
                    formik.touched.categoryName && formik.errors.categoryName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.categoryName && formik.errors.categoryName && (
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
          {/* <ScrollArea className="h-[400px] w-full rounded-md border"> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Category Id</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCategories.map((category) => (
                <TableRow key={category.categoryId}>
                  <TableCell className="font-medium">
                    {category.title}
                  </TableCell>
                  <TableCell>{category.categoryId}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateCategoryStatus(category._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </ScrollArea> */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>

      <div className="flex justify-center sm:justify-start">
        <ViewCatgoryRequestModal />
      </div>
    </div>
  );
};

export default CategoryManagement;
