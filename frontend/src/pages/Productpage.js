// ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from "react-icons/fa"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RelatedProducts from './RelatedProducts';
import ProductDetails from './ProductDetails';
import loadingAnimation from "../Assests/Animations/loading.json";
import Lottie from "lottie-react";
import { useNavigate, useLocation } from 'react-router-dom';
import './PagesCSS/ProductPage.css';
import { useCart } from '../Contexts/CartContext';
import { useWishlist } from '../Contexts/WishlistContext';

const ProductPage = ({products}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useCart();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { wishlist, dispatch: wishlistDispatch } = useWishlist();

  // Scroll management
  useEffect(() => {
    sessionStorage.setItem("lastScrollPosition", window.scrollY.toString());
    window.scrollTo(0, 0);

    return () => {
      if (!location.pathname.includes('/product/')) {
        const savedPosition = sessionStorage.getItem("lastScrollPosition");
        if (savedPosition) {
          window.scrollTo(0, parseInt(savedPosition, 10));
        }
      }
    };
  }, [location.pathname]);

  // Product fetch logic
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://gangs-backend.onrender.com/api/products/${id}`);
        if (response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Choose your size to flex GANGS style!');
      return;
    }
    const cartItem = {
      cartId: `${product.id}-${selectedSize}-${Date.now()}`,
      ...product,
      size: selectedSize,
      quantity,
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Choose your size to flex GANGS style!');
      return;
    }
    handleAddToCart();
    navigate('/buy-now');
  };

  const handleFullscreenNavigation = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Lottie animationData={loadingAnimation} loop={true} style={{ width: 150, height: 150 }} />
      </div>
    );
  }

  if (!product) {
    return null; // No product found, but no UI is shown as per your request
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > 50) {
      // Swipe left → Next image
      setCurrentImageIndex((prevIndex) =>
        prevIndex < product.images.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (swipeDistance < -50) {
      // Swipe right → Previous image
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleAddToWishlist = () => {
    const item = {
      _id: product._id, // Use MongoDB ID
      name: product.name,
      price: product.price,
      image: product.images[0], // Ensure this exists
    };
  
    if (wishlist.some((w) => w._id === product._id)) {
      toast.info("Already in Wishlist!");
    } else {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: item });
      toast.success("Added to Wishlist!");
    }
  };

  return (
    <div className="product-page">
      <ToastContainer   
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme = "dark"
      />
      
      <div className="product-page-container">
        <div className="image-gallery"
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd} >
          <div className="thumbnail-strip">
            {product.images.map((img, index) => (
              <div 
                key={index}
                className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={img} alt={`View ${index + 1}`} />
              </div>                           
            ))}
          </div>
          <div className="main-image-container">
            <button 
              className="nav-btn prev-btn"
              onClick={() => setCurrentImageIndex(prev => 
                prev === 0 ? product.images.length - 1 : prev - 1
              )}
            >&lt;</button>
            <button 
              className="nav-btn next-btn"
              onClick={() => setCurrentImageIndex(prev => 
                prev === product.images.length - 1 ? 0 : prev + 1
              )}
            >&gt;</button>
            <button 
              className="fullscreen-toggle"
              onClick={() => setShowFullscreen(true)}
            >
              ⤢
            </button>
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.name}
              className="main-image"
            />
          </div>
        </div>

        <div className="product-details-container">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="price-block">
            <span className="current-price">₹{product.price}</span>
            {product.original_price && (
              <>
                <span className="original-price">₹{product.original_price}</span>
                <span className="discount-tag">
                  {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <div className="size-selector">
            <div className="size-header">
              <span>Select Size</span>
              <button className="size-chart-btn">Size Chart</button>
            </div>
            <div className="size-options">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-picker">
            <button onClick={() => quantity > 1 && setQuantity(q => q - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          
          <div className="description-text">
            {product.description}
          </div>

          <ProductDetails details={product.product_details} />

          <div className="action-buttons">
            <button 
              className="add-cart-btn" 
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button 
              className="buy-now-btn" 
              onClick={handleBuyNow}        
            >
              Buy Now
            </button>
          </div>

            <button className="wishlist-btn" onClick={handleAddToWishlist}>
              <FaHeart className={`heart-icon ${wishlist.some((w) => w._id === product._id) ? "filled" : ""}`} size={20} />
              Add to Wishlist
            </button>

          <div className="service-features">
            <div className="feature">
              <span className="icon">💎</span>
              <span>Premium Quality</span>
            </div>
            <div className="feature">
              <span className="icon">🚚</span>
              <span>Fast Shipping</span>
            </div>
            <div className="feature">
              <span className="icon">💫</span>
              <span>Free Shipping</span>
            </div>
            <div className="feature">
              <span className="icon">💬</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {showFullscreen && (
        <div className="fullscreen-overlay" onClick={() => setShowFullscreen(false)}>
          <button 
            className="fullscreen-nav-btn prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleFullscreenNavigation('prev');
            }}
          >&lt;</button>
          <button 
            className="fullscreen-nav-btn next-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleFullscreenNavigation('next');
            }}
          >&gt;</button>
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
            className="fullscreen-image"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <button className="close-fullscreen">×</button>
        </div>
      )}

      <RelatedProducts productId={product.id} />
    </div>
  );
};

export default ProductPage;