import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

export const AuthRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const userRole = useSelector((state: RootState) => state.store.user?.role);

  if (!userRole) {
    return <Navigate to="/" />;
  }

  return allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export const AuthAdminRoute = ({
  element,
  allowedRoles,
}: ProtectedRouteProps) => {
  const userRole = useSelector((state: RootState) => state.store.user?.role);

  if (!userRole) {
    return <Navigate to="/admin" />;
  }

  return allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/unauthorized" />
  );
};
