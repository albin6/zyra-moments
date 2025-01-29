import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, role, allowedRoles }) => {
  const userRole = localStorage.getItem("role"); // Example, fetch from Redux or Context

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  return allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default ProtectedRoute;
