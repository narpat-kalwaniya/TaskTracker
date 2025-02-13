import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  const token = sessionStorage.getItem("UserDetails");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
