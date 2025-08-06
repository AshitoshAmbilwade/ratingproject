import React from 'react';
import UserStats from './components/UserStats';
import StoreStats from './components/StoreStats';
import RatingStats from './components/RatingStats';
import AddUserForm from './components/AddUserForm';
import AddStoreForm from './components/AddStoreForm';
import UserList from './components/UserList';
import StoreList from './components/StoreList';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UserStats />
        <StoreStats />
        <RatingStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddUserForm />
        <AddStoreForm />
      </div>

      <UserList />
      <StoreList />
    </div>
  );
};

export default Dashboard;
