import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Tag } from "lucide-react";
import { VendorCategoryModal } from "../modals/VendorCategoryModal";
import { useEffect, useState } from "react";
import {
  useAllCategoriesMutations,
  useCategoryRequestedQuery,
} from "@/hooks/common/useAllCategories";
import { joinCategory } from "@/services/common/categoryService";
import { toast } from "sonner";
import { QueryCache } from "@tanstack/react-query";

interface ProfileHeaderProps {
  onEdit?: () => void;
}

export function ProfileHeader({ onEdit }: ProfileHeaderProps) {
  const { mutate: joinExistingCategory } =
    useAllCategoriesMutations(joinCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isRequestedOrJoined, setIsRequestedOrJoined] = useState(false);

  const { data, isLoading, isError, refetch } = useCategoryRequestedQuery();

  const queryCache = new QueryCache({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: (data, error) => {
      console.log(data, error);
    },
  });

  useEffect(() => {
    if (isError) {
      console.log("error ayiiiiiiiiiiiiiiiiii=>");
      setIsRequestedOrJoined(false);
    } else if (data) {
      console.log(data);
      setIsRequestedOrJoined(true);
    }
  }, [data, isError]);

  // Manual cache clearing and refetching the query (if needed)
  const handleRefetch = () => {
    queryCache.clear(); // Clear cache if needed
    refetch(); // Trigger a refetch
  };

  useEffect(() => {
    handleRefetch();
  }, []);
  const handleSave = (category: string) => {
    console.log("Selected or created category:", category);
    joinExistingCategory(category, {
      onSuccess: (data) => toast.success(data.message),
      onError: (error: any) => toast.error(error.response.data.message),
    });
  };
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <div className="flex items-center space-x-4">
          {!isLoading && !isRequestedOrJoined && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Tag className="h-5 w-5" />
              Choose Category
            </Button>
          )}

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button size="sm" onClick={onEdit}>
            Edit
          </Button>
        </div>
      </div>
      <VendorCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
