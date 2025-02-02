import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NoAuthRouteProps {
  element: JSX.Element;
}

export const NoAuthRoute = ({ element }: NoAuthRouteProps) => {
  const user = useSelector((state: RootState) => state.store.user);
  console.log(user);
  if (user && user?.role !== "client") {
    return <Navigate to={"/unauthorized"} />;
  }

  if (user) {
    return <Navigate to="/landing" replace />;
  }

  return element;
};

export const NoAdminAuthRoute = ({ element }: NoAuthRouteProps) => {
  const user = useSelector((state: RootState) => state.store.user);

  if (user && user?.role !== "admin") {
    return <Navigate to={"/unauthorized"} />;
  }

  if (user) {
    return <Navigate to="/admin/ad_pvt" replace />;
  }

  return element;
};
