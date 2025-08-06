import React, { useEffect, useState } from 'react';
import { fetchAllStores } from '../../../api/adminService';
import { FaStore } from 'react-icons/fa';

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

  if (loading) return <div>Loading store stats...</div>;

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">Store Stats</h2>
      <p className="flex items-center gap-2">
        <FaStore /> Total Stores: {totalStores}
      </p>
      <p>Average Rating Across Stores: {avgRating.toFixed(2)}</p>
    </div>
  );
};

export default StoreStats;
