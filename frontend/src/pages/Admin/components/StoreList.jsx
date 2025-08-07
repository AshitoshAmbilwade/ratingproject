import React, { useEffect, useState } from 'react';
import { fetchAllStores } from '../../../api/adminService';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

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
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Store List</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Avg. Rating</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50 transition duration-150">
                <td className="py-3 px-6">{store.name}</td>
                <td className="py-3 px-6">{store.email}</td>
                <td className="py-3 px-6">{store.address}</td>
                <td className="py-3 px-6 flex items-center gap-1">
                  <FaStar className="text-yellow-500" /> {store.averageRating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreList;
