import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { CalendarDays, ChevronDown, Bell, LogOut, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks/auth/useLogout";
import { useDispatch } from "react-redux";
import { adminLogout } from "@/store/slices/adminSlice";
import { toast } from "sonner";
import { logoutAdmin } from "@/services/auth/authService";

const navItems = [
  { name: "Events", href: "#events" },
  { name: "Users", href: "#users" },
  { name: "Reports", href: "#reports" },
  { name: "Settings", href: "#settings" },
];

export function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mutate: logoutReq } = useLogout(logoutAdmin);
  const dispatch = useDispatch();

  const logoutUser = () => {
    logoutReq(undefined, {
      onSuccess: (data) => {
        dispatch(adminLogout());
        toast.success(data.message);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-10 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          {/* <a href="/" className="mr-6 flex items-center space-x-2">
            <CalendarDays className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              EventMaster Admin
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav> */}
        </div>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <CalendarDays className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Button>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="grid gap-2 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex w-full items-center py-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="outline"
              className="inline-flex items-center whitespace-nowrap"
              size="sm"
            >
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </Button>
          </div>
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                  <span className="sr-only">Open user menu</span>
                  <Shield className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logoutUser}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
