// CartPage.jsx
import React from 'react';
import { useCart } from '../Contexts/CartContext';
import { Link } from 'react-router-dom';
import './PagesCSS/CartPage.css';
 

const CartPage = () => {
  const { items, dispatch, cartCount } = useCart();

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

    React.useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);
  
  return (
    <div className="cart-page">
      <h1>Your Cart ({cartCount} items)</h1>
      
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={item.cartId} className="cart-item">
                <img src={item.images[0]} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { cartId: item.cartId, quantity: item.quantity - 1 }
                      })}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { cartId: item.cartId, quantity: item.quantity + 1 }
                      })}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-pricing">
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-item"
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.cartId })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <p>Subtotal ({cartCount} items): ₹{totalAmount.toFixed(2)}</p>
              <p>Shipping: Free</p>
              <p className="total">Total: ₹{totalAmount.toFixed(2)}</p>
            </div>
            <Link to="/buy-now" className="checkout-button">Proceed to Checkout</Link>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;