import React, { useState } from 'react';
import { useAddress } from "../Contexts/AddressContext";
import './PagesCSS/addressPage.css';
import { FiX } from 'react-icons/fi';

const AddressPage = ({ onClose, isOpen }) => {
  const { dispatch, addresses } = useAddress();
  
  const safeAddresses = Array.isArray(addresses) ? addresses : [];
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '', text: '' });

  const handleEdit = (address) => {
    setFormData({
      fullName: address.fullName, // Use correct field names
      email: address.email,
      phone: address.phone,
      text: address.text,
    });
    setEditingId(address.id);
  };

  const handleSave = () => {
    if (editingId) {
      dispatch({
        type: 'UPDATE_ADDRESS',
        payload: { id: editingId, ...formData }
      });
      setEditingId(null);
      setFormData({ fullname: '', email: '', phone: '', text: '' });
    }
  };

  return (
    <div className={`address-slider ${isOpen ? 'open' : ''}`}>
      <div className="address-slider-content">
        <div className="address-header">
          <h3>Saved Addresses</h3>
          <button className="close-btn" onClick={onClose}><FiX size={24} /></button>
        </div>

        {safeAddresses.length === 0 ? (
          <p style={{ padding: '10px 0 10px 20px' }}>No addresses saved.</p>
        ) : (
          safeAddresses.map((address) => (
            <div key={address.id} className="address-item">
              {editingId === address.id ? (
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number"
                  />
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={4}
                    placeholder="Address"
                  />
                  <button className="save-btn" onClick={handleSave}>Save</button>
                </div>
              ) : (
                <div>
                  <p><strong>Name:</strong> {address.fullname}</p>
                  <p><strong>Email:</strong> {address.email}</p>
                  <p><strong>Phone:</strong> {address.phone}</p>
                  <p><strong>Address:</strong> {address.text}</p>
                </div>
              )}
              <button className="edit-btn" onClick={() => handleEdit(address)}>Edit</button>
              <button className="delete-btn" onClick={() => dispatch({ type: 'REMOVE_ADDRESS', payload: address.id })}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressPage;
