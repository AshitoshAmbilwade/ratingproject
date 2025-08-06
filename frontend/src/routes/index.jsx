import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import AdminDashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import CreateStore from "../pages/StoreOwner/CreateStore";
import MyStores from "../pages/StoreOwner/MyStores";
//import RateStore from "../pages/user/RateStore";

const routes = [
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

  // Add similar role-based control for store owner / user
  {
    path: "/store/create",
    element: <CreateStore />,
    isProtected: true,
    allowedRoles: ["STORE_OWNER"],
  },
  {
    path: "/store/my-stores",
    element: <MyStores />,
    isProtected: true,
    allowedRoles: ["STORE_OWNER"],
  },
  // User Routes
  //{ path: "/user/rate", element: <RateStore />, isProtected: true },

  // Default
  { path: "*", element: <Navigate to="/" /> },
];

export default routes;
