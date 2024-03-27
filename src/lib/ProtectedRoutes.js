import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.studentAuth);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
