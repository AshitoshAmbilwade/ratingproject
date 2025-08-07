// src/pages/StoreOwner/components/RatingUserList.jsx
import React from 'react';

const RatingUserList = ({ ratings }) => {
  return (
    <div className="mt-2">
      <h4 className="text-sm font-semibold text-gray-700">Submitted by:</h4>
      <ul className="text-sm text-gray-600 list-disc pl-4">
        {ratings.map((r, idx) => (
          <li key={idx}>
            {r.user.name} ({r.user.email}) - {r.rating} ⭐
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingUserList;
