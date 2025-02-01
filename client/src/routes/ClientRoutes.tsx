import { Route, Routes } from "react-router-dom";

import { ClientAuth } from "@/pages/client/ClientAuth";
import NoAuthRoute from "@/protected/NoAuthRoute";
import ProtectedRoute from "@/protected/ProtectedRoute";
import ClientLayout from "@/components/layouts/ClientLayout";
import ClientLandingPage from "@/pages/client/ClientLanding";

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<NoAuthRoute element={<ClientAuth />} />} />
        <Route
          path="/landing"
          element={
            <ProtectedRoute
              allowedRoles={["client"]}
              element={<ClientLandingPage />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default ClientRoutes;
