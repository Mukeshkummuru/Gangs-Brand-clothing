import React, { useState } from "react";
import "./ComponentsCSS/searchform.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, category });
  };

  return (
    <div className="search-container-new">
      <form onSubmit={handleSubmit} className="search-form-new">
        {/* Search Input and Button Container */}
        <div className="search-input-button-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input-new"
          />
          <button type="submit" className="search-submit-new">
            Search
          </button>
        </div>
  
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="search-select-new"
        >
          <option value="">All Categories</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="sweatshirts">Sweatshirts</option>
          <option value="jackets">Jackets</option>
          <option value="t-shirts">T-shirts</option>
        </select>
      </form>
    </div>
  );
}
export default Search;
