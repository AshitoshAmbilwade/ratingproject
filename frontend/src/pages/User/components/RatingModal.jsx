// src/pages/User/components/RatingModal.jsx
import React, { useState } from "react";
import { submitRating, updateRating } from "../../../api/userService";

const RatingModal = ({ storeId, currentRating, onClose, onRatingUpdate }) => {
  const [rating, setRating] = useState(currentRating || 1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (currentRating) {
        await updateRating(storeId, rating);
      } else {
        await submitRating(storeId, rating);
      }
      onRatingUpdate(rating);
      onClose();
    } catch (err) {
      console.error("Rating failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h3 className="text-lg font-bold mb-4 text-blue-700">Rate Store</h3>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full mb-4 border px-2 py-1 rounded"
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
