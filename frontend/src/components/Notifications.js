import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import "./ComponentsCSS/Notifications.css";

export const CartNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="cart-notification">{message}</div>;
};


export const OrderSuccess = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="order-success-overlay">
      <div className="order-success-animation">
        <Lottie
          animationData={require('../Assests/Animations/orderSuccess.json')}
          loop={false}
          autoplay={true}
        />
        <div className="success-message">
          🎉Thanks for shopping! Now you're in our gang! 🤟
        </div>
      </div>
    </div>
  );
};