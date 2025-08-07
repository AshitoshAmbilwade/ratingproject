// src/pages/User/components/StoreCard.jsx
import React, { useEffect, useState } from "react";
import { getUserRating } from "../../../api/userService";
import RatingModal from "./RatingModal";

const StoreCard = ({ store }) => {
  const [userRating, setUserRating] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await getUserRating(store.id);
        setUserRating(res.rating?.rating || null);
      } catch (err) {
        console.error("Failed to fetch user rating", err);
      }
    };
    fetchRating();
  }, [store.id]);

  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold text-blue-700">{store.name}</h3>
      <p className="text-sm text-gray-600">Address: {store.address}</p>
      <p className="text-sm text-gray-600">
        Overall Rating:{" "}
        {store.averageRating != null && !isNaN(store.averageRating)
          ? Number(store.averageRating).toFixed(1)
          : "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        Your Rating: {userRating || "Not Rated"}
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {userRating ? "Update Rating" : "Rate Store"}
      </button>

      {showModal && (
        <RatingModal
          storeId={store.id}
          currentRating={userRating}
          onClose={() => setShowModal(false)}
          onRatingUpdate={setUserRating}
        />
      )}
    </div>
  );
};

export default StoreCard;
