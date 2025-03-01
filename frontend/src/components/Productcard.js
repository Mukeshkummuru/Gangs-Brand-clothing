import React from "react";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "./Optimizedimage";
import LazyLoad from "react-lazyload";
import "./ComponentsCSS/products.css";
import { useAuth } from "../Contexts/AuthContext";
import { useWishlist } from "../Contexts/WishlistContext";
import { FaHeart } from "react-icons/fa"; // Import heart icon

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user, setShowLoginPrompt } = useAuth();
  const { wishlist, dispatch } = useWishlist();

  if (!product || Object.keys(product).length === 0) {
    return null; // Prevents rendering if product is undefined or empty
  }

  const handleClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      navigate(`/product/${product._id}`);
    }
  };

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const handleAddToWishlist = (e) => {
    e.stopPropagation(); // Prevents triggering product navigation

    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product._id });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  };
 
  return (
    <LazyLoad height={300} offset={100} placeholder={<div className="skeleton-loader" />}>
      <div className="product-card" onClick={handleClick}>
        <div className="image-container">
          {product.images && product.images.length > 0 ? (
            <OptimizedImage src={product.images[0]} alt={product.name} width={300} height={200} />
          ) : product.image ? (
            <OptimizedImage src={product.image} alt={product.name} width={300} height={200} />
          ) : (
            <div className="image-placeholder">No Image Available</div>
          )}
          <FaHeart
            className={`wishlist-icon ${isInWishlist ? "filled" : ""}`}
            onClick={handleAddToWishlist}
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name || "Unknown Product"}</h3>
          <div className="price-container">
            <span className="current-price_main">₹{product.price || "N/A"}</span>
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
