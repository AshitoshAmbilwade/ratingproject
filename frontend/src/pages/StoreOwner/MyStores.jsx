// src/pages/StoreOwner/MyStores.jsx
import React, { useEffect, useState } from 'react';
import { getMyStores, deleteStore as deleteStoreApi } from '../../api/storeOwnerService';
import toast from 'react-hot-toast';
import StoreRatingStats from './components/StoreRatingStats';

const MyStores = () => {
  const [stores, setStores] = useState([]);

  const handleDelete = async (storeId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this store?');
    if (!confirmDelete) return;

    try {
      await deleteStoreApi(storeId);
      toast.success('Store deleted successfully');
      setStores(prev => prev.filter(store => store.id !== storeId));
    } catch (err) {
      toast.error('Failed to delete store');
      console.error(err);
    }
  };

  useEffect(() => {
    const loadStores = async () => {
      try {
        const res = await getMyStores();
        setStores(res.stores || []);
      } catch (err) {
        toast.error('Failed to load stores');
        console.error(err);
      }
    };

    loadStores();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-blue-700">My Stores</h2>
      {stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        <ul className="space-y-4">
          {stores.map((store) => (
            <li
              key={store.id}
              className="p-4 border rounded shadow-sm bg-gray-50 space-y-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{store.name}</h3>
                  <p className="text-sm text-gray-600">Email: {store.email}</p>
                  <p className="text-sm text-gray-600">Address: {store.address}</p>
                </div>
                <button
                  onClick={() => handleDelete(store.id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              <StoreRatingStats storeId={store.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyStores;
