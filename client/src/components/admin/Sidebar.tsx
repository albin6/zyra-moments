import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CalendarDays,
  Users,
  DollarSign,
  BarChart2,
  Menu,
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import { useLogout } from "@/hooks/auth/useLogout";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { toast } from "sonner";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div className={cn("hidden border-r bg-background md:block", className)}>
        <SidebarContent />
      </div>
    </>
  );
}

function SidebarContent() {
  const { mutate: logoutReq } = useLogout();
  const dispatch = useDispatch();

  const logoutUser = () => {
    logoutReq(undefined, {
      onSuccess: (data) => {
        dispatch(logout());
        toast.success(data.message);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xl font-bold tracking-tight">
          Event Management
        </h2>
        <div className="space-y-1">
          <Button variant="secondary" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Attendees
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CalendarDays className="mr-2 h-4 w-4" />
            Events
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <DollarSign className="mr-2 h-4 w-4" />
            Finance
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart2 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Settings
        </h2>
        <Button variant="ghost" className="w-full justify-start mb-3">
          <Settings className="mr-2 h-4 w-4" />
          General Settings
        </Button>
        <Button onClick={logoutUser} className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
