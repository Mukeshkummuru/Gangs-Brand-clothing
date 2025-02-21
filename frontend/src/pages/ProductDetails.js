import React, { useState } from "react";


const ProductDetails = ({ details }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="details-container">
        <div className="details-header" onClick={() => setIsOpen(!isOpen)}>
          <h3>Product Details</h3>
          <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
        </div>
        {isOpen && (
          <ul className="details-content">
            {details.map((item, index) => (
              <li key={index} className="detail-item">{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

export default ProductDetails;