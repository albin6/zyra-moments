import { Outlet } from "react-router-dom";
import { AdminHeader } from "../headers/AdminHeader";
import { Sidebar } from "../admin/Sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="w-64" />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
