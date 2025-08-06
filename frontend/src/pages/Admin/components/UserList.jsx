import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../../api/adminService';
import toast from 'react-hot-toast';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetchAllUsers();
      setUsers(res.users || []);
    } catch (err) {
      toast.error('Failed to load users');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.toLowerCase() });
  };

  const filteredUsers = users.filter(user =>
    (user.name || '').toLowerCase().includes(filters.name) &&
    (user.email || '').toLowerCase().includes(filters.email) &&
    (user.address || '').toLowerCase().includes(filters.address) &&
    (user.role || '').toLowerCase().includes(filters.role)
  );

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-6">
      <h2 className="text-lg font-bold mb-4">All Users</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input name="name" placeholder="Filter by name" onChange={handleChange} className="border px-2 py-1 rounded" />
        <input name="email" placeholder="Filter by email" onChange={handleChange} className="border px-2 py-1 rounded" />
        <input name="address" placeholder="Filter by address" onChange={handleChange} className="border px-2 py-1 rounded" />
        <input name="role" placeholder="Filter by role" onChange={handleChange} className="border px-2 py-1 rounded" />
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Address</th>
            <th className="border px-3 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-3 py-2">{user.name}</td>
              <td className="border px-3 py-2">{user.email}</td>
              <td className="border px-3 py-2">{user.address}</td>
              <td className="border px-3 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
