import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAllCategoryQuery } from "@/hooks/category/useAllCategory";
import {
  Category,
  getAllCategoriesForClient,
} from "@/services/category/categoryService";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "react-router-dom";

export function ClientLandingCategorySection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const { data, isLoading } = useAllCategoryQuery(getAllCategoriesForClient);

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!categories) {
    return;
  }

  return (
    <section className="py-16 bg-muted/50 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Explore Event Categories
        </h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {categories.map((category) => (
              <Card
                key={category.categoryId}
                onClick={() => navigate(`/categories/${category._id}/vendors`)}
                className="w-[200px] h-[100px] flex-shrink-0 transition-all duration-300 hover:bg-accent cursor-pointer"
              >
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <span className="text-center font-medium">
                    {category.title}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
