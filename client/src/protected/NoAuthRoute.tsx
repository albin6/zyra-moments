import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NoAuthRouteProps {
  element: JSX.Element;
}

const NoAuthRoute = ({ element }: NoAuthRouteProps) => {
  const user = useSelector((state: RootState) => state.store.user);
  console.log("no auth =>", user);

  if (user) {
    return <Navigate to="/landing" replace />;
  }

  return element;
};

export default NoAuthRoute;
