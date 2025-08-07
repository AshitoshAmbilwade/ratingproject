// src/pages/User/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by store name or address..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default SearchBar;
