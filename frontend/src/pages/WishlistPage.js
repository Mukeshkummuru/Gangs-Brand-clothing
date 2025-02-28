import {useEffect} from "react";
import { useWishlist } from "../Contexts/WishlistContext";
import ProductCard from "../components/Productcard";
import "../pages/PagesCSS/Wishlist.css";


const Wishlist = () => {
  const { wishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title-new">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-message">Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
              
              <ProductCard key={product._id} product={product} />
             
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
