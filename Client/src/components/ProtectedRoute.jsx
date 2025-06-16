import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedRouteAdmin = () => {
  const { role, token } = useAuth();
  return token && role == "Admin" ? <Outlet /> : <Navigate to="/" />;
};
