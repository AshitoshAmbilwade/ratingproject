import React, { useState } from 'react';
import { addNewStore } from '../../../api/adminService';
import toast from 'react-hot-toast';
import { FaStoreAlt } from 'react-icons/fa';

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
    <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <FaStoreAlt className="text-green-600 text-xl" />
        <h2 className="text-xl font-semibold text-gray-800">Add New Store</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Owner Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          name="address"
          placeholder="Store Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
        >
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AddStoreForm;
