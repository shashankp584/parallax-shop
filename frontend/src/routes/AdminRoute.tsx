import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
