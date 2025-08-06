import React, { useState } from 'react';
import { addNewUser } from '../../../api/adminService';
import toast from 'react-hot-toast';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'USER', // default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addNewUser(formData);
      toast.success('User added successfully');
      setFormData({ name: '', email: '', password: '', address: '', role: 'USER' });
    } catch (err) {
      toast.error('Failed to add user');
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
