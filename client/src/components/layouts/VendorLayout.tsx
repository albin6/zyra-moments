import { Outlet } from "react-router-dom";
import { VendorHeader } from "../headers/VendorHeader";

function VendorLayout() {
  return (
    <div className="min-h-screen bg-background">
      <VendorHeader />
      <Outlet />
    </div>
  );
}

export default VendorLayout;
