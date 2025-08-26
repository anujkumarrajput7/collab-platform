import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Creators</h2>
      <input
        type="text"
        placeholder="Enter creator name or category"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-2/3"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-600 text-white p-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
