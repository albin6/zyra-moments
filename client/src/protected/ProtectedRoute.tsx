import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const userRole = useSelector((state: RootState) => state.store.user?.role);

  console.log("auth route =>", userRole);

  if (!userRole) {
    return <Navigate to="/" />;
  }

  return allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default ProtectedRoute;
