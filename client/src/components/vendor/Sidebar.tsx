import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Card } from "../ui/card";
import { useLogout } from "@/hooks/auth/useLogout";
import { useDispatch } from "react-redux";
import { vendorLogout } from "@/store/slices/vendorSlice";
import { toast } from "sonner";
import { logoutVendor } from "@/services/auth/authService";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  firstName: string;
  lastName: string;
  profileImage: string;
  joinCategoryRequestStatus: string | undefined;
}

export function Sidebar({
  firstName,
  lastName,
  profileImage,
  joinCategoryRequestStatus,
}: SidebarProps) {
  const navigate = useNavigate();
  const { mutate: logoutReq } = useLogout(logoutVendor);
  const dispatch = useDispatch();

  const location = useLocation();

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
    <Card>
      <aside className="w-64 hidden md:flex flex-col p-6 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profileImage} alt={firstName} />
            <AvatarFallback className="bg-primary/10">
              {firstName.charAt(0) + lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">
            {firstName + " " + lastName}
          </h2>
        </div>

        <nav className="flex-1 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-center font-normal ${
              location.pathname === "/vendor/profile" && "bg-accent"
            }`}
            onClick={() => navigate("/vendor/profile")}
          >
            My Profile
          </Button>
          <Button
            variant="ghost"
            disabled={joinCategoryRequestStatus !== "accepted"}
            className={`w-full justify-center font-normal  ${
              location.pathname === "/vendor/services" && "bg-accent"
            }`}
            onClick={() => navigate("/vendor/services")}
          >
            Services
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-center font-normal ${
              location.pathname === "/vendor/work-sample" && "bg-accent"
            }`}
            onClick={() => navigate("/vendor/work-sample")}
            disabled={joinCategoryRequestStatus !== "accepted"}
          >
            Work Samples
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-center font-normal ${
              location.pathname === "/vendor/bookings" && "bg-accent"
            }`}
            onClick={() => navigate("/vendor/bookings")}
            disabled={joinCategoryRequestStatus !== "accepted"}
          >
            Bookings
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-center font-normal ${
              location.pathname === "/vendor/reviews" && "bg-accent"
            }`}
            onClick={() => navigate("/vendor/reviews")}
            disabled={joinCategoryRequestStatus !== "accepted"}
          >
            Reviews
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-center font-normal ${
              location.pathname === "/vendor/wallet" && "bg-accent"
            }`}
            onClick={() => navigate("/vendor/wallet")}
            disabled={joinCategoryRequestStatus !== "accepted"}
          >
            Wallet
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-center font-normal ${
              location.pathname === "/vendor/transactions" && "bg-accent"
            }`}
            onClick={() => navigate("/vendor/transactions")}
            disabled={joinCategoryRequestStatus !== "accepted"}
          >
            Transactions
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-center font-normal ${
              location.pathname === "/vendor/chat" && "bg-accent"
            }`}
            onClick={() => navigate("/vendor/chat")}
            disabled={joinCategoryRequestStatus !== "accepted"}
          >
            Messages
          </Button>
        </nav>

        <Button
          onClick={logoutUser}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </aside>
    </Card>
  );
}
