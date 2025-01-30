import ClientLayout from "@/components/layouts/ClientLayout";
import useAuth from "@/hooks/custom/useAuth";
import { ClientAuth } from "@/pages/client/ClientAuth";
import { Route, Routes } from "react-router-dom";

function ClientRoutes() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<ClientAuth />} />
      </Route>
    </Routes>
  );
}

export default ClientRoutes;
