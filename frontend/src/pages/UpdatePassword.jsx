import React, { useState } from 'react';
import authService from '../api/authService';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.updatePassword(formData);
      toast.success('Password updated successfully');
      setFormData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Update Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
