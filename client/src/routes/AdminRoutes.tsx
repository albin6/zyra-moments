import AdminLayout from "@/components/layouts/AdminLayout";
import { AdminAuth } from "@/pages/admin/AdminAuth";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { NoAdminAuthRoute } from "@/protected/PublicRoute";
import { AuthAdminRoute } from "@/protected/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NoAdminAuthRoute element={<AdminAuth />} />} />
      <Route
        path="/dashboard"
        element={
          <AuthAdminRoute allowedRoles={["admin"]} element={<AdminLayout />} />
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
