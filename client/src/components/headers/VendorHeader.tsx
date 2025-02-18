import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDispatch } from "react-redux";
import { vendorLogout } from "@/store/slices/vendorSlice";
import { useVendorAuth } from "@/hooks/custom/useAuth";
import { useLogout } from "@/hooks/auth/useLogout";
import { toast } from "sonner";
import { logoutVendor } from "@/services/auth/authService";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Dashboard", href: "#" },
  { name: "Products", href: "#" },
  { name: "Orders", href: "#" },
  { name: "Analytics", href: "#" },
];

interface SidebarProps {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

export function VendorHeader({
  firstName,
  lastName,
  email,
  profileImage,
}: SidebarProps) {
  const { isLoggedIn } = useVendorAuth();
  const { mutate: logoutReq } = useLogout(logoutVendor);
  const dispatch = useDispatch();

  const logoutUser = () => {
    logoutReq(undefined, {
      onSuccess: (data) => {
        dispatch(vendorLogout());
        toast.success(data.message);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" to="/vendor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="hidden font-bold sm:inline-block">
              Vendor Portal
            </span>
          </Link>
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
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <Button
              variant="default"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Add Product
            </Button> */}
          </div>
          <ModeToggle />
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profileImage} alt={firstName} />
                    <AvatarFallback className="bg-primary/10">
                      {firstName.charAt(0) + lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {firstName + " " + lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Store Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutUser}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-3">
      <Link className="flex items-center space-x-2" to={"/vendor"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        <span className="font-bold">Vendor Portal</span>
      </Link>
      <nav className="flex flex-col space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
