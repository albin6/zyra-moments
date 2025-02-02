import { Route, Routes } from "react-router-dom";

import { ClientAuth } from "@/pages/client/ClientAuth";
import { NoAuthRoute } from "@/protected/PublicRoute";
import { AuthRoute } from "@/protected/ProtectedRoute";
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
            <AuthRoute
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
