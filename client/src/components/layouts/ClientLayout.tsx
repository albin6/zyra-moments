import { Outlet } from "react-router-dom";
import { ClientHeader } from "../headers/ClientHeader";

function ClientLayout() {
  return (
    <div>
      <div className="min-h-screen bg-background">
        <ClientHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default ClientLayout;
