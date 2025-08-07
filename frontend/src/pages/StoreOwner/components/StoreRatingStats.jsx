// src/pages/StoreOwner/components/StoreRatingStats.jsx
import React, { useEffect, useState } from 'react';
import { getStoreRatings } from '../../../api/storeOwnerService';
import RatingUserList from './RatingUserList';

const StoreRatingStats = ({ storeId }) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const res = await getStoreRatings(storeId);
        setRatings(res.ratings || []);
      } catch (err) {
        console.error('Error loading ratings', err);
      }
    };

    loadRatings();
  }, [storeId]);

  const averageRating =
    ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);

  return (
    <div className="mt-3">
      <p className="text-sm text-green-600">
        Average Rating: {averageRating.toFixed(2)} | Total Ratings: {ratings.length}
      </p>
      <RatingUserList ratings={ratings} />
    </div>
  );
};

export default StoreRatingStats;
