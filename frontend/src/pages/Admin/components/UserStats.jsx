import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../../api/adminService';
import { FaUsers, FaUserShield, FaUser } from 'react-icons/fa';

const UserStats = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchAllUsers();
        setUsers(response.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'ADMIN').length;
  const normalUserCount = users.filter(u => u.role === 'USER').length;

  if (loading) return <div>Loading user stats...</div>;

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">User Stats</h2>
      <div className="space-y-2">
        <p className="flex items-center gap-2"><FaUsers /> Total Users: {totalUsers}</p>
        <p className="flex items-center gap-2 text-blue-600"><FaUserShield /> Admins: {adminCount}</p>
        <p className="flex items-center gap-2 text-green-600"><FaUser /> Normal Users: {normalUserCount}</p>
      </div>
    </div>
  );
};

export default UserStats;
