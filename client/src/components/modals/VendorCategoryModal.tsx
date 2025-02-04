import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface VendorCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: string) => void;
}

export function VendorCategoryModal({
  isOpen,
  onClose,
  onSave,
}: VendorCategoryModalProps) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  const handleSave = () => {
    if (isCreatingNew && newCategory) {
      onSave(newCategory);
    } else if (selectedCategory) {
      onSave(selectedCategory);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose or Create Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isCreatingNew ? (
            <Select
              onValueChange={setSelectedCategory}
              value={selectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {/* {categories.map((category) => (
                  <SelectItem key={category.categoryId} value={category._id}>
                    {category.title}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              className="w-full"
            />
          )}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsCreatingNew(!isCreatingNew)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {isCreatingNew ? "Choose Existing Category" : "Create New Category"}
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedCategory && !newCategory}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
