import VendorLayout from "@/components/layouts/VendorLayout";
import { VendorAuth } from "@/pages/vendor/VendorAuth";
import { Route, Routes } from "react-router-dom";

function VendorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<VendorLayout />}>
        <Route index element={<VendorAuth />} />
      </Route>
    </Routes>
  );
}

export default VendorRoutes;
