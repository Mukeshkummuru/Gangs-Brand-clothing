import React, { memo } from 'react';
import "./ComponentsCSS/footer.css";
import appStore from "../Assests/images/appStore.png";
import googlePlay from "../Assests/images/googlePlay.png";
import instagram from "../Assests/images/instagram.png";
import twitter from "../Assests/images/twitter.png";
import linkedin from "../Assests/images/linkedin.png";

const Footer = memo(() => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Download App</li>
            <li>Subscribe</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>FAQ</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            <li>Login/Register</li>
            <li>My Account</li>
            <li>Wishlist</li>
            <li>Cart</li>
          </ul>
        </div>

        {/* Download App Section */}
        <div className="footer-section">
          <h4>Download App</h4>
          <div className="app-download">
            <img src={appStore} alt="App Store" className="app-image" />
            <img src={googlePlay} alt="Google Play" className="app-image" />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-media">
            <a
              href="https://www.linkedin.com/in/mukesh-kummuru-b25b6429b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" className="social-image" />
            </a>
            <a
              href="https://www.instagram.com/mukeshzz_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="Instagram" className="social-image" />
            </a>
            <a
              href="https://www.linkedin.com/in/mukesh-kummuru-b25b6429b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="Twitter" className="social-image" />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Nawabpeta, R.k Nagar, Nellore</p>
          <p>Gangsbrand@gmail.com</p>
          <p>965256****</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
          />
        </div>
      </div>

      <div className="footer-divider"></div>
      
      <div className="footer-bottom">
        <p>This website is fully developed by @Mukesh.k</p>
        <p>@Gangs 2025. All right reserved. copyrights Owned by Founders</p>
      </div>
    </footer>
  );
});

export default Footer;