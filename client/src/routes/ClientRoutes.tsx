import ClientLayout from "@/components/layouts/ClientLayout";
import { ClientAuth } from "@/pages/client/ClientAuth";
import { Route, Routes } from "react-router-dom";

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route path="login" element={<ClientAuth />} />
      </Route>
    </Routes>
  );
}

export default ClientRoutes;
