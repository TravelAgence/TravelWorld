import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Named import

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);
  console.log("Decoded Token in ProtectedRoute:", decodedToken); // Debugging
  const userRole = decodedToken?.role;

  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;