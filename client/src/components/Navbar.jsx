import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

function Navbar() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("creators");

  const handleSearch = () => {
    alert(`Searching for "${query}" in ${searchType}`);
    // Baad me yaha API call karna:
    // fetch(`/api/search?type=${searchType}&query=${query}`)
  };

  return (
    <nav className="navbar">
      <div className="logo">CollabMart 🚀</div>

      {/* 🔹 Universal Search with Dropdown */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search ${searchType}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="ml-2"
        >
          <option value="creators">Creators</option>
          <option value="companies">Companies</option>
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
