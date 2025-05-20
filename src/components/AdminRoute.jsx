import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const role = localStorage.getItem("userRole");
  console.log("📢 userRole from localStorage:", role);

  if (role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/not-authorized" />;
  }
};

export default AdminRoute;