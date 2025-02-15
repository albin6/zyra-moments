import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Tag } from "lucide-react";
import { VendorCategoryModal } from "../modals/VendorCategoryModal";
import { useState } from "react";
import { useVendorJoinCategoryMutation } from "@/hooks/vendor/useVendorProfile";
import { toast } from "sonner";

interface ProfileHeaderProps {
  onEdit?: () => void;
  isEdit: boolean;
  joinCategoryRequestStatus: string | undefined;
}

export function ProfileHeader({
  onEdit,
  isEdit,
  joinCategoryRequestStatus,
}: ProfileHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: vendorJoinCategory } = useVendorJoinCategoryMutation();

  const handleSave = (category: string) => {
    console.log("Selected or created category:", category);
    vendorJoinCategory(category, {
      onSuccess: (data) => toast.success(data.message),
      onError: (error: any) => toast.error(error.response.data.message),
    });
  };
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <div className="flex items-center space-x-4">
          {joinCategoryRequestStatus === "Not Requested" && (
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
          <Button
            size="sm"
            className={`${isEdit && "opacity-50"}`}
            disabled={isEdit}
            onClick={onEdit}
          >
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
