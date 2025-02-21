import React from "react";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "./Optimizedimage";
import LazyLoad from "react-lazyload";
import "./ComponentsCSS/products.css";
import { useAuth } from "../Contexts/AuthContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user, setShowLoginPrompt } = useAuth();

  const handleClick = () => {
    if (!user) {
      setShowLoginPrompt(true); // Show login modal if not logged in
    } else {
      navigate(`/product/${product.id}`); // Navigate to product details
    }
  };

  return (
    <LazyLoad height={300} offset={100} placeholder={<div className="skeleton-loader" />}>
      <div className="product-card" onClick={handleClick}>
        <div className="image-container">
          <OptimizedImage src={product.images[0]} alt={product.name} width={300} height={200} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="price-container">
            <span className="current-price_main">₹{product.price}</span>
            {product.original_price && product.original_price > product.price && (
              <>
                <span className="original-price_main">₹{product.original_price}</span>
                <span className="discount-tag_main">
                  ({Math.round((1 - product.price / product.original_price) * 100)}% OFF)
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </LazyLoad>
  );
};

export default React.memo(ProductCard);
