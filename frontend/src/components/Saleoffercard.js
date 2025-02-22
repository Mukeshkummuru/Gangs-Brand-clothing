import React, { useState, useEffect } from "react";
import image1 from "../Assests/images/banner1.jpg";
import image2 from "../Assests/images/banner2.jpg";
import gangslogo from  "../Assests/images/gangs.jpg";
import  "./ComponentsCSS/saleoffercard.css"; // Import your styles

const images = [gangslogo, image1, image2 ];

const SaleOfferCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div> 
    <div className="sale-offer-card">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Sale Offer ${index + 1}`}
          className={index === currentIndex ? "active" : ""}
        />
      ))}
     </div>
     <div className="text"> <h5>Scroll up | Page is yours</h5> </div>
      {/* New Brand Story Section */}
      <div className="brand-story">
        <h2 className="hover-underline"> Want To Know About GANGS - </h2>
        <p>
          GANGS is more than just a brand—it's a movement. Born from the dream of three
          friends passionate about fashion, GANGS represents individuality, boldness, and 
          confidence. Our clothing is designed to make you feel powerful, stylish, and 
          unapologetically yourself. GANGS is all about you and your fashion sense. 
          Wear confidence. Dress well. Be you.
        </p>
        <p>
          Our motto? <span style={{fontWeight:"bold"}}>"Wear Confidence. Dress Well. Be You."</span> Because when you wear GANGS, 
          you're not just wearing clothes—you're wearing your personality.
        </p>
      </div>
   </div>
  );
};

export default SaleOfferCard;
