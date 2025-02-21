// ProductPage.jsx
import React, { useState, useEffect,} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'lucide-react';
import RelatedProducts from './RelatedProducts';
import ProductDetails from './ProductDetails';
import loadingAnimation from "../Assests/Animations/loading.json";
import Lottie from "lottie-react";
import { useNavigate , useLocation} from 'react-router-dom';
import './PagesCSS/ProductPage.css';
import { useCart } from '../Contexts/CartContext';
 

const ProductPage = ({products}) => {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [selectedSize, setSelectedSize] = useState('');
const [quantity, setQuantity] = useState(1);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [showFullscreen, setShowFullscreen] = useState(false);
const navigate = useNavigate()
const location = useLocation();
const { dispatch} = useCart();


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

useEffect(() => {
    if (!products || products.length === 0) {
        setLoading(false);
    }
}, [products]);

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://gangs-backend.onrender.com/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    if (id) fetchProduct();
}, [id]);


    const handleProductClick = () => {
            navigate(`/product/${product.id}`);
        };
    
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        const cartItem = {
            cartId: `${product.id}-${selectedSize}-${Date.now()}`, // Ensuring uniqueness
            ...product,
            size: selectedSize,
            quantity,
        };
          dispatch({ type: 'ADD_TO_CART', payload: cartItem });
        };
      
        const handleBuyNow = () => {
          handleAddToCart();
          navigate('/buy-now');
        };
        

    if (loading) {
      return (
        <div className="loading-container">
          <Lottie animationData={loadingAnimation} loop={true} style={{ width: 150, height: 150 }} />
        </div>
      );
    }
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-page">
            <div className="product-page-container">
                <div className="image-gallery">
                    <div className="thumbnail-strip" onClick={handleProductClick}>
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
                        <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                        <button className="buy-now-btn" onClick={handleBuyNow} >Buy Now</button>
                    </div>

                    <button className="wishlist-btn">
                        <Heart size={20} />
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
                    <img 
                        src={product.images[currentImageIndex]} 
                        alt={product.name} 
                        className="fullscreen-image"
                    />
                    <button className="close-fullscreen">×</button>
                </div>
            )}

            <RelatedProducts productId={product.id} />

        </div>
    );
};

export default ProductPage;
            
          
  