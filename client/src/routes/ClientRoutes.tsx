import ClientLayout from "@/components/layouts/ClientLayout";
import useAuth from "@/hooks/custom/useAuth";
import { ClientAuth } from "@/pages/client/ClientAuth";
import ClientLandingPage from "@/pages/client/ClientLanding";
import NoAuthRoute from "@/protected/NoAuthRoute";
import ProtectedRoute from "@/protected/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

function ClientRoutes() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
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
