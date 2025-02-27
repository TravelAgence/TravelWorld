import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  // Decode the token to check the user's role
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken?.role;

  if (userRole !== 'admin') {
    return <Navigate to="/" />; // Redirect to home if not an admin
  }

  return children; // Allow access if the user is an admin
};

export default ProtectedRoute;