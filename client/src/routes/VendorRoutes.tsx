import VendorLayout from "@/components/layouts/VendorLayout";
import VendorAddWorkSample from "@/pages/vendor/VendorAddWorkSample";
import { VendorAuth } from "@/pages/vendor/VendorAuth";
import VendorProfile from "@/pages/vendor/VendorProfile";
import VendorWorkSamples from "@/pages/vendor/VendorWorkSamples";
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
        <Route
          path="/work-sample"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorWorkSamples />}
            />
          }
        />
        <Route
          path="/work-sample/new"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorAddWorkSample />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default VendorRoutes;
