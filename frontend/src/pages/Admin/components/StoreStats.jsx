import React, { useEffect, useState } from 'react';
import { fetchAllStores } from '../../../api/adminService';
import { FaStore, FaStar } from 'react-icons/fa';

const StoreStats = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoresData = async () => {
      try {
        const res = await fetchAllStores();
        setStores(res.stores || []);
      } catch (err) {
        console.error('Error fetching stores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoresData();
  }, []);

  const totalStores = stores.length;
  const avgRating =
    stores.reduce((sum, store) => sum + parseFloat(store.averageRating || 0), 0) /
    (stores.length || 1);

  if (loading) return <div className="text-gray-500">Loading store stats...</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Total Stores */}
      <div className="flex items-center bg-purple-100 border border-purple-300 rounded-md p-4 shadow-md">
        <div className="p-3 bg-purple-600 text-white rounded-full mr-4">
          <FaStore size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-700">Total Stores</p>
          <h2 className="text-xl font-semibold text-purple-800">{totalStores}</h2>
        </div>
      </div>

      {/* Average Rating */}
      <div className="flex items-center bg-orange-100 border border-orange-300 rounded-md p-4 shadow-md">
        <div className="p-3 bg-orange-500 text-white rounded-full mr-4">
          <FaStar size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-700">Avg. Store Rating</p>
          <h2 className="text-xl font-semibold text-orange-800">{avgRating.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default StoreStats;
