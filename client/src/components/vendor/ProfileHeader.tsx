import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Tag } from "lucide-react";
import { VendorCategoryModal } from "../modals/VendorCategoryModal";
import { useState } from "react";

interface ProfileHeaderProps {
  onEdit?: () => void;
}

export function ProfileHeader({ onEdit }: ProfileHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (category: string) => {
    console.log("Selected or created category:", category);
  };
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <div className="flex items-center space-x-4">
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Tag className="h-5 w-5" />
            Choose Category
          </Button>

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
