import React, { useEffect, useState } from 'react';
import { fetchAllRatings } from '../../../api/adminService';
import { FaStar } from 'react-icons/fa';

const RatingStats = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetchAllRatings();
        setRatings(res.ratings || []);
      } catch (err) {
        console.error('Error fetching ratings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading rating stats...</div>;
  }

  return (
    <div className="flex items-center bg-yellow-100 border border-yellow-300 rounded-md p-4 shadow-md">
      <div className="p-3 bg-yellow-500 text-white rounded-full mr-4">
        <FaStar size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-700">Total Submitted Ratings</p>
        <h2 className="text-xl font-semibold text-yellow-800">{ratings.length}</h2>
      </div>
    </div>
  );
};

export default RatingStats;
