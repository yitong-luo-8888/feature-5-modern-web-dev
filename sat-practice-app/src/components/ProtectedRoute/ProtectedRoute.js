// src/components/ProtectedRoute/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

const ProtectedRoute = () => {
  return checkUser() ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
