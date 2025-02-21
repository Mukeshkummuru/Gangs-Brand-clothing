import React, { useState, useEffect } from 'react';
import  "./ComponentsCSS/FeaturedSection.css";
import image1 from '../Assests/images/mukesh13.webp';
import image2 from '../Assests/images/varun10.webp';

const FeaturedSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.feature-wrapper');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <section className={`feature-wrapper ${isVisible ? 'show' : ''}`}>
      <div className="feature-container">
        {/* First Feature */}
        <div className="feature-box slide-in-left">
          <div className="feature-text">
            <h2 className="feature-heading">GANGS Clothing Philosophy</h2>
            <p className="feature-description">
              At GANGS, we believe in merging comfort with style. Our fabrics are 
              carefully selected from premium organic cotton sources, ensuring 
              breathability and durability. The unique texture of our garments 
              comes from a special weaving technique that creates a subtle 
              diamond pattern in the fabric.
            </p>
            <ul className="feature-list">
              <li>✓ 100% Organic Cotton</li>
              <li>✓ Reinforced Stitching</li>
              <li>✓ Colorfast Dyes</li>
              <li>✓ Eco-friendly Packaging</li>
            </ul>
          </div>
          <div className="feature-image-wrapper">
            <div className="feature-image-container">
              <img 
                src={image1} 
                alt="Fabric Texture"
                className="feature-image"
              />
            </div>
          </div>
        </div>

        {/* Second Feature */}
        <div className="feature-box slide-in-right">
          <div className="feature-image-wrapper">
            <div className="feature-image-container">
              <img
                src={image2}
                alt="Design Process"
                className="feature-image2"
              />
            </div>
          </div>
          <div className="feature-text">
            <h2 className="feature-heading">Craftsmanship & Design</h2>
            <p className="feature-description">
              Our design process involves meticulous attention to detail. Each 
              garment undergoes 12 quality checks before reaching you. The 
              signature GANGS fit is achieved through 3D body mapping technology, 
              ensuring consistent sizing across all our collections.
            </p>
            <div className="feature-stats">
              <div className="stat-box">
                <h3>150+</h3>
                <p>Design Hours per Product</p>
              </div>
              <div className="stat-box">
                <h3>98%</h3>
                <p>Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
