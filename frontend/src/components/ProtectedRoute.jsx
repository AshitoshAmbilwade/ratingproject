import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const role = decoded?.role;

    if (!allowedRoles.includes(role)) {
      return <div className="text-center text-red-600 font-bold mt-10">Access Denied</div>;
    }

    return children;
  } catch (error) {
    console.error('Token decode error:', error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
