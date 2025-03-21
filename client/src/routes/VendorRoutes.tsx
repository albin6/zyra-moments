import { Custom404 } from "@/components/404/Custom404";
import VendorLayout from "@/components/layouts/VendorLayout";
import VendorReviewList from "@/components/reviews/VendorReviewList";
import VendorAddService from "@/pages/vendor/VendorAddService";
import VendorAddWorkSample from "@/pages/vendor/VendorAddWorkSample";
import { VendorAuth } from "@/pages/vendor/VendorAuth";
import VendorBookings from "@/pages/vendor/VendorBookings";
import VendorChatPage from "@/pages/vendor/VendorChatPage";
import VendorEditService from "@/pages/vendor/VendorEditService";
import VendorProfile from "@/pages/vendor/VendorProfile";
import VendorServices from "@/pages/vendor/VendorServices";
import VendorTransactions from "@/pages/vendor/VendorTransactions";
import VendorWallet from "@/pages/vendor/VendorWallet";
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
        <Route
          path="/bookings"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorBookings />}
            />
          }
        />
        <Route
          path="/transactions"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorTransactions />}
            />
          }
        />
        <Route
          path="/wallet"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorWallet />}
            />
          }
        />

        <Route
          path="/chat"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorChatPage />}
            />
          }
        />

        <Route
          path="/reviews"
          element={
            <AuthVendorRoute
              allowedRoles={["vendor"]}
              element={<VendorReviewList />}
            />
          }
        />
        <Route
          path="/*"
          element={<Custom404 pathname={window.location.pathname} />}
        />
      </Route>
      <Route
        path="/*"
        element={<Custom404 pathname={window.location.pathname} />}
      />
    </Routes>
  );
}

export default VendorRoutes;
