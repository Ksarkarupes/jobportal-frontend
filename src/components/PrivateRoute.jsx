// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, requiredRole }) {
  const { isLoggedIn, user } = useAuth();
  console.log("isLoggedIn:", isLoggedIn, "user:", user);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.userType !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
