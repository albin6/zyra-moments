import AdminLayout from "@/components/layouts/AdminLayout";
import { AdminAuth } from "@/pages/admin/AdminAuth";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { NoAdminAuthRoute } from "@/protected/PublicRoute";
import { AuthAdminRoute } from "@/protected/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import AdminUserManagement from "@/pages/admin/AdminUserManagement";
import AdminCategoryManagement from "@/pages/admin/AdminCategoryManagement";
import { Custom404 } from "@/components/404/Custom404";
import AdminTransactions from "@/pages/admin/AdminTransactions";
import AdminWallet from "@/pages/admin/AdminWallet";
import EventManagement from "@/components/admin/EventManagement";
import { AdminBookingManagement } from "@/pages/admin/AdminBookingManagement";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NoAdminAuthRoute element={<AdminAuth />} />} />
      <Route
        path="/ad_pvt"
        element={
          <AuthAdminRoute allowedRoles={["admin"]} element={<AdminLayout />} />
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserManagement />} />
        <Route path="category" element={<AdminCategoryManagement />} />
        <Route path="wallet" element={<AdminWallet />} />
        <Route path="transactions" element={<AdminTransactions />} />
        <Route path="events" element={<EventManagement />} />
        <Route path="bookings" element={<AdminBookingManagement  />} />
        <Route
          path="*"
          element={<Custom404 pathname={window.location.pathname} />}
        />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
