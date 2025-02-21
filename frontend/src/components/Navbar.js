import React, { useState, useCallback, useEffect } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import gangslogo from  "../Assests/images/gangs-remove-bg.png";
import  "./ComponentsCSS/navbar.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { useAuth } from "../Contexts/AuthContext";
import AddressPage from "../pages/Addresspage";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const navigate = useNavigate();
  const { cartCount, orders } = useCart();
  const { user, setUser } = useAuth(); // Get user from AuthContext

  const handleSearchClick = () => navigate("/search");
  const handleOrderClick = () => navigate("/orders");
  const handleLoginClick = () => navigate("/login");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear stored token
    setUser(null); // Reset user state
    setIsOpen(false); // Close sidebar after logout
    navigate("/"); // Redirect to home or login page
  };

  const handleScroll = useCallback(() => {
    setNavBackground(window.scrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <nav className={`navbar ${navBackground ? "scrolled" : ""}`}>
        <div className="navbar-content">
          <div className="navbar-logo-container">
            <img src={gangslogo} alt="GANGS Logo" className="navbar-logo" />
          </div>

          <div className="navbar-center">
            <h1>GANGS</h1>
          </div>

          <div className="navbar-right">
            <button className="icon-button search-button" onClick={handleSearchClick}>
              <FaSearch size={24} />
            </button>
            <button className="icon-button cart-button" onClick={() => navigate("/cart")}>
              <FaShoppingCart size={24} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="icon-button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Sidebar (Toggle Menu) */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            {user?.name ? (
              <div className="user-icon">
                <span className="user-initial">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            ) : (
              <div className="default-icon"> <BsPerson size={24} /></div>
            )}
            <h3>{user?.name || "My Account"}</h3>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          <ul className="sidebar-menu">
            {!user ? (
              <li onClick={handleLoginClick}>Login</li>
            ) : (
              <>
                <li onClick={handleOrderClick}>Orders ({orders.length})</li>
                <li className="mobile-cart" onClick={() => navigate("/cart")}>
                  Cart
                </li>
                <li onClick={() => setShowAddress(true)}>Address</li>
                <li className="logout-button" onClick={handleLogout}>Logout</li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <AddressPage isOpen={showAddress} onClose={() => setShowAddress(false)} />
    </>
  );
};

export default Navbar;
