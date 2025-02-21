import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/Productcard";
import './PagesCSS/ProductPage.css';

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  window.scrollTo(0, 0); // Scroll to the top when the component mounts
}, []);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!productId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/related/${productId}`
        );
        setRelatedProducts(response.data);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError("Failed to load related products.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId]);


  return (
    <div className="related-products">
      <h2 className="hover-underline">Customer who brought this have on Look on this :</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="related-list">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!loading && !error && relatedProducts.length === 0 && (
        <p>No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;