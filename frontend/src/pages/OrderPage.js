import { useState, useEffect } from 'react';
import './PagesCSS/OrdersPage.css';
import { useCart } from '../Contexts/CartContext'; // Adjust the path as needed


const OrdersPage = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State to track which order is expanded
  const { orders } = useCart(); // Assuming useCart hook provides orders

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  const handleToggleDetails = (orderId) => {
    // Toggle the visibility of order details when an order is clicked
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              {/* Order ID and Item Image */}
              <div className="order-summary" onClick={() => handleToggleDetails(order.id)}>
                <h3>Order #{order.id}</h3>
                <div className="order-item">
                  <img src={order.items[0]?.images[0]} alt={order.items[0]?.name} />
                  <div className="item-info">
                    <p>{order.items[0]?.name}</p>
                    <p>Size: {order.items[0]?.size}</p>
                    <p>Quantity: {order.items[0]?.quantity}</p>
                  </div>
                </div>
              </div>

              {/* Order Details (hidden by default, revealed on click) */}
              {expandedOrderId === order.id && (
                <div className="order-details">
                  <p>Date: {order.date}</p>
                  <p>Total: ₹{order.totalAmount.toFixed(2)}</p>
                  <p>Payment Method: {order.paymentMethod}</p>
                  <p>Shipping Address: {order.shippingAddress}</p>
                  <div className="order-items">
                    <h4>Items:</h4>
                    {order.items.map((item) => (
                      <div key={item.cartId} className="order-item">
                        <img src={item.images[0]} alt={item.name} />
                        <div className="item-info">
                          <p>{item.name}</p>
                          <p>Size: {item.size}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
