import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ 
  image, 
  mainText, 
  subText, 
  height = '500px',
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  textPosition = 'center',
  textColor = 'white'
}) => {
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

  return (
    <div className="hero" style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: height,
      position: 'relative',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: getTextAlignment(),
      marginTop: 0,
      marginBottom: 'var(--spacing-xl)'
    }}>
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
          padding: 'var(--spacing-lg)',
          color: textColor,
          textAlign: 'center'
        }}>
          <h1 className="hero-title" style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-4xl)',
            fontWeight: '700',
            marginBottom: 'var(--spacing-md)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
          }}>
            {mainText}
          </h1>
          
          {/* Divider */}
          <div className="hero-divider" style={{
            width: '80px',
            height: '4px',
            backgroundColor: 'var(--color-primary)',
            margin: '0 auto',
            marginBottom: 'var(--spacing-md)'
          }}></div>
          
          <p className="hero-subtitle" style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: 'var(--font-size-lg)',
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