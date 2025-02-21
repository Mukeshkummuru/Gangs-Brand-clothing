import React, { useState, useEffect } from 'react';
import { useCart } from '../Contexts/CartContext';
import { OrderSuccess } from '../components/Notifications';
import './PagesCSS/BuyNowPage.css';
import { useAddress } from '../Contexts/AddressContext';

const BuyNowPage = () => {
  const { items, addOrder, dispatch: cartDispatch } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const { dispatch: addressDispatch, addresses = [] } = useAddress();
  const [selectedAddressId, setSelectedAddressId] = useState(null); // Track selected address

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
  });

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Reset selected address if user modifies any field
    if (selectedAddressId) {
      setSelectedAddressId(null);
    }
  };

  const handleAddressClick = (selectedAddress) => {
    setFormData({
      fullName: selectedAddress.fullName,
      email: selectedAddress.email,
      phone: selectedAddress.phone,
      address: selectedAddress.text,
      paymentMethod: formData.paymentMethod,
    });
    setSelectedAddressId(selectedAddress.id); // Track which address is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save as new address only if:
    // 1. No address is selected AND
    // 2. Address field is not empty AND
    // 3. Form data doesn't match any existing address
    if (
      !selectedAddressId &&
      formData.address.trim() !== '' &&
      !addresses.some(
        (addr) =>
          addr.fullName === formData.fullName &&
          addr.email === formData.email &&
          addr.phone === formData.phone &&
          addr.text === formData.address
      )
    ) {
      addressDispatch({
        type: 'ADD_ADDRESS',
        payload: formData,
      });
    }

    addOrder({
      id: Date.now(),
      items: [...items],
      totalAmount,
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      date: new Date().toLocaleString(),
    });

    cartDispatch({ type: 'HURRY_NOTIFICATION' });
    cartDispatch({ type: 'CLEAR_CART' });

    setTimeout(() => {
      setShowSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: '',
      });
      setSelectedAddressId(null); // Reset selected address
    }, 100);
  };
 
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);

  return (
    <div className="buy-now-page">
      {showSuccess && <OrderSuccess onClose={() => setShowSuccess(false)} />}
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="delivery-details">
          <h2>Delivery Information</h2>
          <form className="form-new" onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
            <textarea name="address" placeholder="Shipping Address" value={formData.address} onChange={handleInputChange} required />

            <div className="saved-addresses">
  <h4>Saved Addresses</h4>
  {addresses.length > 0 ? (
    addresses.map((addr) => (
      <div key={addr.id} className="address-field" onClick={() => handleAddressClick(addr)}>
        <p><strong>{addr.fullName}</strong></p>
        <p>{addr.text}</p>
        <p>{addr.email}</p>
        <p>{addr.phone}</p>
      </div>
    ))
  ) : (
    <p className="no-addresses">No saved addresses</p>
  )}
</div>


            <div className="payment-methods">
              <h3>Payment Method</h3>
              <label>
                <input type="radio" name="paymentMethod" value="credit-card" checked={formData.paymentMethod === 'credit-card'} onChange={handleInputChange} required />
                Credit/Debit Card
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} />
                UPI
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                Cash on Delivery
              </label>
            </div>
            <button type="submit" className="place-order-button">
              Place Order (₹{totalAmount.toFixed(2)})
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item.cartId} className="order-item">
              <img src={item.images[0]} alt={item.name} />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="total-amount">
            <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;
