import { Outlet } from "react-router-dom";
import { VendorHeader } from "../headers/VendorHeader";

function VendorLayout() {
  return (
    <div>
      <VendorHeader />
      <Outlet />
    </div>
  );
}

export default VendorLayout;
