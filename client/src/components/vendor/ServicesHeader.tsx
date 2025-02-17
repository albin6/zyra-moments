import { Button } from "@/components/ui/button";
import { Bell, MessageSquare } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function ServicesHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {(location.pathname === "/vendor/services" && "My Services") ||
            (location.pathname === "/vendor/services/new" && "New Service")}
        </h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button size="sm" onClick={() => navigate("/vendor/services/new")}>
            Add Service
          </Button>
        </div>
      </div>
    </div>
  );
}
