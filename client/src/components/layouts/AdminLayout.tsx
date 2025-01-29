import { Outlet } from "react-router-dom";
import { AdminHeader } from "../headers/AdminHeader";

function AdminLayout() {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
