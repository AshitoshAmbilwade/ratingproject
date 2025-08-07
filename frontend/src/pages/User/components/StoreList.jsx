// src/pages/User/components/StoreList.jsx
import React, { useEffect, useState } from "react";
import { getAllStores } from "../../../api/userService";
import StoreCard from "./StoreCard";
import SearchBar from "./SearchBar";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await getAllStores({
          search: searchTerm,
        });
        setStores(res.stores || []);
      } catch (err) {
        console.error("Failed to fetch stores", err);
      }
    };

    fetchStores();
  }, [searchTerm]);

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {stores.length === 0 ? (
        <p className="text-gray-600">No stores found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreList;
