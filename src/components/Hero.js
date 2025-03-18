import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BlurUpImage from './BlurUpImage';

const Hero = ({ 
  image, 
  mainText, 
  subText, 
  height = '500px',
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  textPosition = 'center',
  textColor = 'white'
}) => {
  const [responsiveHeight, setResponsiveHeight] = useState(height);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Update height based on screen size
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      if (window.innerWidth <= 480) {
        setResponsiveHeight('350px');
      } else if (window.innerWidth <= 768) {
        setResponsiveHeight('400px');
      } else {
        setResponsiveHeight(height);
      }
    };
    
    // Set initial height
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [height]);

  // Define text alignment based on position
  const getTextAlignment = () => {
    switch(textPosition) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  };

  // Responsive font sizes
  const getTitleFontSize = () => {
    if (windowWidth <= 480) {
      return 'calc(var(--font-size-3xl) * 0.8)';
    } else if (windowWidth <= 768) {
      return 'calc(var(--font-size-3xl) * 0.9)';
    }
    return 'var(--font-size-4xl)';
  };
  
  const getSubtitleFontSize = () => {
    if (windowWidth <= 480) {
      return 'calc(var(--font-size-md) * 1.1)';
    } else if (windowWidth <= 768) {
      return 'var(--font-size-lg)';
    }
    return 'var(--font-size-lg)';
  };

  return (
    <div className="hero" style={{
      position: 'relative',
      height: responsiveHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: getTextAlignment(),
      marginTop: 0,
      marginBottom: 'var(--spacing-xl)',
      overflow: 'hidden'
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <BlurUpImage 
          src={image}
          alt="Hero background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: overlayColor,
        zIndex: 1
      }}></div>
      
      {/* Content */}
      <div className="container" style={{ zIndex: 2, position: 'relative' }}>
        <div className="hero-content" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: windowWidth <= 480 ? 'var(--spacing-md)' : 'var(--spacing-lg)',
          color: textColor,
          textAlign: 'center'
        }}>
          <h1 className="hero-title" style={{
            fontFamily: 'var(--font-primary)',
            fontSize: getTitleFontSize(),
            fontWeight: '700',
            marginBottom: 'var(--spacing-md)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
          }}>
            {mainText}
          </h1>
          
          {/* Divider */}
          <div className="hero-divider" style={{
            width: windowWidth <= 480 ? '60px' : '80px',
            height: windowWidth <= 480 ? '3px' : '4px',
            backgroundColor: 'var(--color-primary)',
            margin: '0 auto',
            marginBottom: 'var(--spacing-md)'
          }}></div>
          
          <p className="hero-subtitle" style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: getSubtitleFontSize(),
            fontWeight: '400',
            marginBottom: 0,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            {subText}
          </p>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  image: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  height: PropTypes.string,
  overlayColor: PropTypes.string,
  textPosition: PropTypes.oneOf(['left', 'center', 'right']),
  textColor: PropTypes.string
};

export default Hero; 