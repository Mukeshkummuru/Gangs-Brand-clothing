import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Searchform from "../components/Searchform";
import ProductCard from "../components/Productcard";
import noResultsImage from "../Assests/images/noproductfound.png";
import "../components/ComponentsCSS/searchform.css";
import "../components/ComponentsCSS/products.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  const fetchResults = (query, category) => {
    fetch(`http://localhost:5000/api/products?query=${query}&category=${category}`)
      .then((response) => response.json())
      .then((responseData) => {
        // ✅ Access the `data` property from the response
        if (Array.isArray(responseData.data)) {
          setSearchResults(responseData.data); // Set search results
        } else {
          setSearchResults([]); // Set empty results if data is invalid
        }
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  useEffect(() => {
    if (query || category) {
      fetchResults(query, category);
    } else {
      setSearchResults(null); // Reset search results when no query or category
    }
  }, [query, category]);

  const handleSearch = ({ query, category }) => {
    setSearchParams({ query, category });
    fetchResults(query, category);
  };

  return (
    <div>
      <Searchform onSearch={handleSearch} />
      {searchResults === null ? ( // Initial state: Show text only
        <div className="no-results">
          <h4>Hi! Mister, Feel Free to Search / Today is your Day</h4>
          <h3 className="second-line">
            <FaAngleRight className="arrow" />
            <span>And Be a part In our Gang</span>
            <FaAngleLeft className="arrow" />
          </h3>
        </div>
      ) : searchResults.length > 0 ? ( // Valid search: Show products
        <div className="product-grid-search">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : ( // Invalid search: Show no results image
        <div className="no-results">
          <img src={noResultsImage} alt="No products found" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;