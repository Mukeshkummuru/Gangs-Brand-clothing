import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import  "./ComponentsCSS/LoginPromptModal.css";

const LoginPromptModal = () => {
  const navigate = useNavigate();
  const { showLoginPrompt, setShowLoginPrompt } = useAuth();

  if (!showLoginPrompt) return null; // Don't render if not needed

  const handleNavigation = (path) => {
    setShowLoginPrompt(false); // Close modal
    setTimeout(() => navigate(path), 150); // Delay for smoother transition
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Welcome to GANGS!</h2>
          <button className="close-btn" onClick={() => setShowLoginPrompt(false)}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <h5>Please log in to continue shopping.</h5>
          <div className="modal-actions">
            <button className="login-btn" onClick={() => handleNavigation("/login")}>
              Log In
            </button>
            <button className="signup-btn" onClick={() => handleNavigation("/register")}>
              Create Account
            </button>
          </div>
          <p className="continue-text">Continue browsing our latest collections!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
