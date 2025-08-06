import React, { useState } from 'react';
import { addNewStore } from '../../../api/adminService';
import toast from 'react-hot-toast';

const AddStoreForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addNewStore(formData);
      toast.success('Store added successfully');
      setFormData({ name: '', email: '', address: '' });
    } catch (err) {
      toast.error('Failed to add store');
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">Add New Store</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Store Name" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="email" name="email" placeholder="Owner Email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="text" name="address" placeholder="Store Address" value={formData.address} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Store</button>
      </form>
    </div>
  );
};

export default AddStoreForm;
