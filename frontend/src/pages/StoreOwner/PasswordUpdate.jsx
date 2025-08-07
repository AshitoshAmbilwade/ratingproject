// src/pages/StoreOwner/PasswordUpdate.jsx
import React, { useState } from 'react';
import API from '../../api/axiosInstance';
import toast from 'react-hot-toast';

const PasswordUpdate = () => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/update-password', form); // make sure this route exists
      toast.success(res.data.message || 'Password updated');
      setForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-blue-700">Update Password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
