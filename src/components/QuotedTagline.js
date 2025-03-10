import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const QuotedTagline = ({ text }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div className="quoted-tagline" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: windowWidth <= 768 ? '30px auto' : '40px auto',
      maxWidth: windowWidth <= 768 ? '100%' : '900px',
      padding: windowWidth <= 768 ? '0 15px' : '0 20px',
      position: 'relative'
    }}>
      <img 
        src="/assets/svg/quote-left-svgrepo-com.svg" 
        alt="Quote left" 
        style={{
          width: windowWidth <= 768 ? '20px' : '30px',
          height: windowWidth <= 768 ? '20px' : '30px',
          marginRight: windowWidth <= 768 ? '10px' : '15px',
          opacity: '0.8'
        }}
      />
      
      <p style={{
        fontFamily: 'var(--font-secondary)',
        fontSize: windowWidth <= 768 ? 'var(--font-size-md)' : 'var(--font-size-lg)',
        color: 'var(--color-text)',
        textAlign: 'center',
        margin: '0',
        fontStyle: 'italic',
        lineHeight: '1.6'
      }}>
        {text}
      </p>
      
      <img 
        src="/assets/svg/quote-right-svgrepo-com.svg" 
        alt="Quote right" 
        style={{
          width: windowWidth <= 768 ? '20px' : '30px',
          height: windowWidth <= 768 ? '20px' : '30px',
          marginLeft: windowWidth <= 768 ? '10px' : '15px',
          opacity: '0.8'
        }}
      />
    </div>
  );
};

QuotedTagline.propTypes = {
  text: PropTypes.string.isRequired
};

export default QuotedTagline; 