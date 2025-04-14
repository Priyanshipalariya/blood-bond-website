import { Navigate, Outlet } from "react-router";
import { useAuth } from "../Context/Authcontext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;