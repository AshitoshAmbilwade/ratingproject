// src/pages/User/components/Dashboard.jsx
import React from "react";
import StoreList from "./components/StoreList";

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Browse Stores</h2>
      <StoreList />
    </div>
  );
};

export default Dashboard;
