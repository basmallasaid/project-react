// AdminRoute.js
import { Navigate } from "react-router-dom";

// PrivateRoute for Admin
const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  // If role is admin, render children; otherwise, redirect to login
  return role === "admin" ? children : <Navigate to="/Login" />;
};

export default AdminRoute;
