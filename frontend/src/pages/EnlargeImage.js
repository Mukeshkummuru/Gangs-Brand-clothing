import React from "react";
 
const EnlargeImage = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <img src={imageUrl} alt="Enlarged" />
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default EnlargeImage;
