import VendorLayout from "@/components/layouts/VendorLayout";
import { VendorAuth } from "@/pages/vendor/VendorAuth";
import VendorProfile from "@/pages/vendor/VendorProfile";
import { AuthVendorRoute } from "@/protected/ProtectedRoute";
import { NoVendorAuthRoute } from "@/protected/PublicRoute";
import { Route, Routes } from "react-router-dom";

function VendorRoutes() {
  return (
    <Routes>
      <Route index element={<NoVendorAuthRoute element={<VendorAuth />} />} />
      <Route path="/" element={<VendorLayout />}>
        <Route
          path="/profile"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorProfile />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default VendorRoutes;
