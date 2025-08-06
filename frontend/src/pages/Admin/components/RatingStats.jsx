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

  if (loading) return <div>Loading rating stats...</div>;

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">Rating Stats</h2>
      <p className="flex items-center gap-2">
        <FaStar /> Total Submitted Ratings: {ratings.length}
      </p>
    </div>
  );
};

export default RatingStats;
