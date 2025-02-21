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
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input-new"
        />
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
        </select>
        <button type="submit" className="search-submit-new">Search</button>
      </form>
    </div>
  );
};

export default Search;
