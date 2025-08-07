// src/pages/StoreOwner/Dashboard.jsx
import React from 'react';
import MyStores from './MyStores';
import CreateStore from './CreateStore';

const StoreOwnerDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-800">Store Owner Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MyStores />
        
        <CreateStore />
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
