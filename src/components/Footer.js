import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Branding Section */}
          <div className="footer-branding">
            <h3 className="cdhpm-text">CDHPM</h3>
            <img src="/assets/images/Logo.png" alt="CDHPM Logo" className="footer-logo enlarged-logo" />
          </div>

          {/* Quick Links Section */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="https://le.ac.uk/" target="_blank" rel="noopener noreferrer">University of Leicester</a></li>
              <li><a href="https://apollouniversity.edu.in/" target="_blank" rel="noopener noreferrer">The Apollo University</a></li>
              <li><a href="https://www.apollohospitals.com/" target="_blank" rel="noopener noreferrer">Apollo Hospitals</a></li>
              <li><a href="https://apollouniversity.edu.in/uol/pathway-programmes/" target="_blank" rel="noopener noreferrer">Our Programs</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <a href="mailto:contact@cdhpm.com">contact@cdhpm.com</a>
            </p>
            <p>
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
              <span>517127, Murukambattu, Chittoor,<br />Andhra Pradesh, India</span>
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CDHPM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 