import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo-section">
            <h2 className="footer-title">
              CDHPM
            </h2>
            <img 
              src="/assets/images/Logo.png" 
              alt="CDHPM Logo" 
              className="footer-logo" 
            />
          </div>
          
          <div className="footer-newsletter">
            <h4>Sign up for our newsletter</h4>
            {subscribed ? (
              <p className="success-message">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                  <button type="submit" className="subscribe-btn">Subscribe</button>
                </div>
              </form>
            )}
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