// src/pages/StoreOwner/CreateStore.jsx
import React, { useState } from "react";
import { createStore } from "../../api/storeOwnerService";
import toast from "react-hot-toast";

const CreateStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createStore(formData);
      toast.success(res.message || "Store created successfully");
      setFormData({ name: "", address: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Create New Store
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="address"
          placeholder="Store Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
