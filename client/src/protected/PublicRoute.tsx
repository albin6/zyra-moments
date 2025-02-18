import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NoAuthRouteProps {
  element: JSX.Element;
}

export const NoAuthRoute = ({ element }: NoAuthRouteProps) => {
  const user = useSelector((state: RootState) => state.client.client);
  console.log(user);
  if (user && user?.role !== "client") {
    return <Navigate to={"/unauthorized"} />;
  }

  if (user) {
    return <Navigate to="/landing" />;
  }

  return element;
};

export const NoAdminAuthRoute = ({ element }: NoAuthRouteProps) => {
  const user = useSelector((state: RootState) => state.admin.admin);

  if (user && user?.role !== "admin") {
    return <Navigate to={"/unauthorized"} />;
  }

  if (user) {
    return <Navigate to="/admin/ad_pvt" />;
  }

  return element;
};

export const NoVendorAuthRoute = ({ element }: NoAuthRouteProps) => {
  const user = useSelector((state: RootState) => state.vendor.vendor);

  if (user && user?.role !== "vendor") {
    return <Navigate to={"/unauthorized"} />;
  }

  if (user) {
    return <Navigate to="/vendor/profile" />;
  }

  return element;
};
