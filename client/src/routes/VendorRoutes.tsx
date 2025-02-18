import VendorLayout from "@/components/layouts/VendorLayout";
import VendorAddService from "@/pages/vendor/VendorAddService";
import VendorAddWorkSample from "@/pages/vendor/VendorAddWorkSample";
import { VendorAuth } from "@/pages/vendor/VendorAuth";
import VendorEditService from "@/pages/vendor/VendorEditService";
import VendorProfile from "@/pages/vendor/VendorProfile";
import VendorServices from "@/pages/vendor/VendorServices";
import VendorWorkSampleDisplay from "@/pages/vendor/VendorWorkSampleDisplay";
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
        <Route
          path="/work-sample/:workSampleId"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorWorkSampleDisplay />}
            />
          }
        />
        <Route
          path="/services"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorServices />}
            />
          }
        />
        <Route
          path="/services/:serviceId"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorEditService />}
            />
          }
        />
        <Route
          path="/services/new"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorAddService />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default VendorRoutes;
