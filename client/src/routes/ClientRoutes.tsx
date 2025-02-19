import { Route, Routes } from "react-router-dom";

import { ClientAuth } from "@/pages/client/ClientAuth";
import { NoAuthRoute } from "@/protected/PublicRoute";
import { AuthRoute } from "@/protected/ProtectedRoute";
import ClientLayout from "@/components/layouts/ClientLayout";
import ClientLandingPage from "@/pages/client/ClientLanding";
import { UserProfile } from "@/components/client/UserProfile";
import { ClientEventListing } from "@/pages/client/ClientEventListing";
import { ClientVendorListing } from "@/pages/client/ClientVendorListing";
import ClientVendorProfile from "@/pages/client/ClientVendorProfile";

function ClientRoutes() {
  return (
    <Routes>
      <Route index element={<NoAuthRoute element={<ClientAuth />} />} />
      <Route path="/" element={<ClientLayout />}>
        <Route
          path="/landing"
          element={
            <AuthRoute
              allowedRoles={["client"]}
              element={<ClientLandingPage />}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute allowedRoles={["client"]} element={<UserProfile />} />
          }
        />
        <Route
          path="/categories/:categoryId/vendors"
          element={
            <AuthRoute
              allowedRoles={["client"]}
              element={<ClientVendorListing />}
            />
          }
        />
        <Route
          path="/discover/:vendorId/profile"
          element={
            <AuthRoute
              allowedRoles={["client"]}
              element={<ClientVendorProfile />}
            />
          }
        />
        <Route
          path="/events/discover"
          element={
            <AuthRoute
              allowedRoles={["client"]}
              element={<ClientEventListing />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default ClientRoutes;
