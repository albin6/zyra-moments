import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CalendarDays,
  Users,
  Menu,
  Home,
  Settings,
  LogOut,
  ChartBarStacked,
  Wallet,
} from "lucide-react";
import { useLogout } from "@/hooks/auth/useLogout";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin } from "@/services/auth/authService";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const adminRoutes = [
  {
    path: "/admin/ad_pvt",
    label: "Dashboard",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    path: "/admin/ad_pvt/users",
    label: "User Management",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    path: "/admin/ad_pvt/category",
    label: "Category Management",
    icon: <ChartBarStacked className="mr-2 h-4 w-4" />,
  },
  {
    path: "/admin/ad_pvt/events",
    label: "Events",
    icon: <CalendarDays className="mr-2 h-4 w-4" />,
  },
  {
    path: "/admin/ad_pvt/bookings",
    label: "Bookings",
    icon: <CalendarDays className="mr-2 h-4 w-4" />,
  },
  {
    path: "/admin/ad_pvt/wallet",
    label: "Wallet",
    icon: <Wallet className="mr-2 h-4 w-4" />,
  },
];

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
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: logoutReq } = useLogout(logoutAdmin);
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
          Zyra Moments
        </h2>
        <div className="space-y-1">
          {adminRoutes.map(({ path, label, icon }) => (
            <Button
              key={path}
              onClick={() => navigate(path)}
              variant={location.pathname === path ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {icon}
              {label}
            </Button>
          ))}
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
