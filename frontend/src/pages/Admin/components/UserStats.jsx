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

  if (loading) return <div className="text-gray-500">Loading user stats...</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Total Users */}
      <div className="flex items-center bg-blue-100 border border-blue-300 rounded-md p-4 shadow-md">
        <div className="p-3 bg-blue-600 text-white rounded-full mr-4">
          <FaUsers size={24} />
        </div>
        <div>
          <p className="text-gray-700 text-sm">Total Users</p>
          <h2 className="text-xl font-semibold text-blue-800">{totalUsers}</h2>
        </div>
      </div>

      {/* Admins */}
      <div className="flex items-center bg-green-100 border border-green-300 rounded-md p-4 shadow-md">
        <div className="p-3 bg-green-600 text-white rounded-full mr-4">
          <FaUserShield size={24} />
        </div>
        <div>
          <p className="text-gray-700 text-sm">Admin Users</p>
          <h2 className="text-xl font-semibold text-green-800">{adminCount}</h2>
        </div>
      </div>

      {/* Normal Users */}
      <div className="flex items-center bg-yellow-100 border border-yellow-300 rounded-md p-4 shadow-md">
        <div className="p-3 bg-yellow-500 text-white rounded-full mr-4">
          <FaUser size={24} />
        </div>
        <div>
          <p className="text-gray-700 text-sm">Normal Users</p>
          <h2 className="text-xl font-semibold text-yellow-800">{normalUserCount}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
