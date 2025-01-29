import { Outlet } from "react-router-dom";
import { ClientHeader } from "../headers/ClientHeader";

function ClientLayout() {
  return (
    <div>
      <ClientHeader />
      <Outlet />
    </div>
  );
}

export default ClientLayout;
