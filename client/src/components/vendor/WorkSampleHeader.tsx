import { Button } from "@/components/ui/button";
import { Bell, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function WorkSampleHeader() {
  const navigate = useNavigate();
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button size="sm" onClick={() => navigate("/vendor/work-sample/new")}>
            Add Sample
          </Button>
        </div>
      </div>
    </div>
  );
}
