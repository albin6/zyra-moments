import { Button } from "@/components/ui/button";
import { Bell, MessageSquare } from "lucide-react";
import { useLocation } from "react-router-dom";

export function AddWorkSampleHeader() {
  const location = useLocation();
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {location.pathname === "/vendor/work-sample/new"
            ? "New Sample"
            : "My Profile"}
        </h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          {location.pathname !== "/vendor/work-sample/new" && (
            <Button size="sm">Add Sample</Button>
          )}
        </div>
      </div>
    </div>
  );
}
