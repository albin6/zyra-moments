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
import ClientVendorBooking from "@/pages/client/ClientVendorBooking";
import { ClientBookingListing } from "@/pages/client/ClientBookingListing";
import { Custom404 } from "@/components/404/Custom404";
import HostEventFlow from "@/pages/client/HostEventFlow";
import { EventProvider } from "@/context/EventContext";
import { ClientEventDetails } from "@/pages/client/ClientEventDetails";
import { EventAttendancePage } from "@/pages/client/EventAttendancePage";
import { ClientChatPage } from "@/pages/chat/ChatPage";

function ClientRoutes() {
  return (
    <Routes>
      <Route index element={<NoAuthRoute element={<ClientAuth />} />} />
      <Route
        path="/"
        element={
          <AuthRoute allowedRoles={["client"]} element={<ClientLayout />} />
        }
      >
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
            <AuthRoute
              allowedRoles={["client"]}
              element={
                <EventProvider>
                  <UserProfile />
                </EventProvider>
              }
            />
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
        <Route
          path="/events/discover/:id/details"
          element={
            <AuthRoute
              allowedRoles={["client"]}
              element={<ClientEventDetails />}
            />
          }
        />
        <Route
          path="/events/mc"
          element={
            <AuthRoute allowedRoles={["client"]} element={<HostEventFlow />} />
          }
        />
        <Route
          path="/events/:eventId/attendance"
          element={
            <AuthRoute
              allowedRoles={["client"]}
              element={<EventAttendancePage />}
            />
          }
        />
        <Route
          path="/booking/:vendorId"
          element={
            <AuthRoute
              allowedRoles={["client"]}
              element={<ClientVendorBooking />}
            />
          }
        />
        <Route
          path="/bookings"
          element={
            <AuthRoute
              allowedRoles={["client"]}
              element={<ClientBookingListing />}
            />
          }
        />

        <Route
          path="/chat"
          element={
            <AuthRoute allowedRoles={["client"]} element={<ClientChatPage />} />
          }
        />

        {/* <Route
          path="/client/chat"
          element={
            <AuthRoute allowedRoles={["client"]} element={<ClientChatPage />} />
          }
        /> */}
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

export default ClientRoutes;
