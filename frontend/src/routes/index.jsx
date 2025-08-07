import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";

// Admin Pages
import AdminDashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";

// StoreOwner Pages
import StoreOwnerDashboard from "../pages/StoreOwner/Dashboard";
import UpdatePassword from "../pages/UpdatePassword";

import UserDashboard from "../pages/User/Dashboard";

const routes = [
  // Public Routes
  { path: "/", element: <Home />, isProtected: false },
  { path: "/login", element: <Login />, isProtected: false },
  { path: "/signup", element: <Signup />, isProtected: false },

  // Admin Routes
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    isProtected: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/admin/users",
    element: <Users />,
    isProtected: true,
    allowedRoles: ["ADMIN"],
  },

  // Store Owner Routes
  {
    path: "/store-owner/dashboard",
    element: <StoreOwnerDashboard />,
    isProtected: true,
    allowedRoles: ["STORE_OWNER"],
  },

  //update password
  {
  path: "/update-password",
  element: <UpdatePassword />,
  isProtected: true,
  allowedRoles: ["ADMIN", "USER", "STORE_OWNER"],
},
  // Future User Routes (if needed)
 {
  path: "/user/dashboard",
  element: <UserDashboard />,
  isProtected: true,
  allowedRoles: ["USER"],
},
  // Default Route
  { path: "*", element: <Navigate to="/" /> },
];

export default routes;
