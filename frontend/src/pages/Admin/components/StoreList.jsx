import React, { useEffect, useState } from 'react';
import { fetchAllStores } from '../../../api/adminService';
import toast from 'react-hot-toast';

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const res = await fetchAllStores();
      setStores(res.stores || []);
    } catch (err) {
      toast.error('Failed to load stores');
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-6">
      <h2 className="text-lg font-bold mb-4">All Stores</h2>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Address</th>
            <th className="border px-3 py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id} className="text-center">
              <td className="border px-3 py-2">{store.name}</td>
              <td className="border px-3 py-2">{store.email}</td>
              <td className="border px-3 py-2">{store.address}</td>
              <td className="border px-3 py-2">{store.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
