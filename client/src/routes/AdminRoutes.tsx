import AdminLayout from "@/components/layouts/AdminLayout";
import { AdminAuth } from "@/pages/admin/AdminAuth";
import { Route, Routes } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="login" element={<AdminAuth />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
