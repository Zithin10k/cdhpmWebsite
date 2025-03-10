import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BioModal from './BioModal';

const LeadershipCard = ({ 
  name, 
  title, 
  bio, 
  photo, 
  size = 'medium', 
  showBio = false,
  layout = 'vertical',
  isEven = false,
  onClick
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 900;
  const isCoDirectorMobile = layout === 'horizontal' && (isMobile || isTablet);

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

  // Function to handle card click
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // Determine card size based on prop and screen size
  const getCardSize = () => {
    // For horizontal layout
    if (layout === 'horizontal') {
      // Mobile or tablet view (up to 900px) - revert to vertical layout
      if (isTablet) {
        return {
          width: '100%',
          maxWidth: '350px',
          height: 'auto',
          minHeight: '380px'
        };
      }
      
      // Tablet view (900px - 1024px)
      if (windowWidth <= 1024) {
        return {
          width: '100%',
          maxWidth: '90%',
          height: 'auto',
          minHeight: '300px'
        };
      }
      
      // Desktop view (above 1024px)
      return {
        width: '100%',
        maxWidth: '90%',
        height: 'auto',
        minHeight: '300px'
      };
    }
    
    // For vertical layout (original)
    // Mobile view (up to 768px)
    if (isMobile) {
      return {
        width: '100%',
        maxWidth: '350px',
        height: '380px'
      };
    }
    
    // Tablet view (768px - 1024px)
    if (windowWidth <= 1024) {
      switch(size) {
        case 'large':
          return {
            width: '100%',
            maxWidth: '450px',
            height: '420px'
          };
        default:
          return {
            width: '100%',
            maxWidth: '320px',
            height: '380px'
          };
      }
    }
    
    // Desktop view (above 1024px)
    switch(size) {
      case 'large':
        return {
          width: '100%',
          maxWidth: '500px',
          height: '450px'
        };
      case 'medium':
        return {
          width: '100%',
          maxWidth: '350px',
          height: '400px'
        };
      case 'small':
        return {
          width: '100%',
          maxWidth: '300px',
          height: '350px'
        };
      default:
        return {
          width: '100%',
          maxWidth: '350px',
          height: '400px'
        };
    }
  };

  const cardSize = getCardSize();

  // Horizontal layout for co-directors - only for screens wider than 900px
  if (layout === 'horizontal' && !isTablet) {
    return (
      <div 
        className="leadership-card-horizontal" 
        style={{
          ...cardSize,
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          margin: '30px auto',
          position: 'relative',
          display: 'flex',
          flexDirection: isEven ? 'row-reverse' : 'row',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
      >
        {/* Image */}
        <div 
          className="leadership-card-image" 
          style={{
            width: '40%',
            minHeight: '350px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <img 
            src={`/assets/leadership/img/${photo}.jpg`} 
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>
        
        {/* Content */}
        <div 
          className="leadership-card-content" 
          style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '60%',
            textAlign: 'left'
          }}
        >
          <h3 
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: 'var(--font-size-xl)',
              margin: '0 0 10px 0',
              color: 'var(--color-text-dark)',
              textAlign: 'left'
            }}
          >
            {name}
          </h3>
          
          <p 
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: 'var(--font-size-md)',
              color: 'var(--color-primary)',
              margin: '0 0 20px 0',
              fontWeight: '500',
              textAlign: 'left'
            }}
          >
            {title}
          </p>
          
          {/* Bio */}
          <p 
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-md)',
              color: 'var(--color-text)',
              margin: '0',
              lineHeight: '1.6',
              overflow: 'auto',
              textAlign: 'left'
            }}
          >
            {bio}
          </p>
        </div>
      </div>
    );
  }

  // For all other cases: vertical layout or horizontal layout on tablet/mobile
  const shouldShowModal = showBio || layout === 'horizontal' || (layout === 'vertical' && isMobile);
  
  return (
    <>
      <div 
        className="leadership-card" 
        style={{
          ...cardSize,
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          margin: isMobile ? '15px 0' : '15px',
          position: 'relative',
          cursor: shouldShowModal ? 'pointer' : 'default',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={shouldShowModal ? handleCardClick : undefined}
        onMouseEnter={(e) => {
          if (!isMobile) { // Only apply hover effects on larger screens
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) { // Only apply hover effects on larger screens
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
          }
        }}
      >
        {/* Plus icon for clickable cards */}
        {shouldShowModal && (
          <div 
            className="plus-icon"
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              zIndex: 2,
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
            }}
          >
            +
          </div>
        )}
        
        {/* Image */}
        <div 
          className="leadership-card-image" 
          style={{
            width: '100%',
            height: '65%',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <img 
            src={`/assets/leadership/img/${photo}.jpg`} 
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) { // Only apply hover effects on larger screens
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) { // Only apply hover effects on larger screens
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          />
          <div 
            className="image-overlay" 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '30%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              zIndex: 1
            }}
          ></div>
        </div>
        
        {/* Content */}
        <div 
          className="leadership-card-content" 
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'left'
          }}
        >
          <h3 
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: isMobile 
                ? 'var(--font-size-md)' 
                : (size === 'large' ? 'var(--font-size-xl)' : 'var(--font-size-lg)'),
              margin: '0 0 8px 0',
              color: 'var(--color-text-dark)',
              textAlign: 'left'
            }}
          >
            {name}
          </h3>
          
          <p 
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: isMobile ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
              color: 'var(--color-primary)',
              margin: '0',
              fontWeight: '500',
              textAlign: 'left'
            }}
          >
            {title}
          </p>
          
          {/* Bio excerpt for co-directors on desktop */}
          {!showBio && layout !== 'horizontal' && bio && (
            <p 
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: isMobile ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
                color: 'var(--color-text)',
                margin: '15px 0 0 0',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'left'
              }}
            >
              {bio}
            </p>
          )}
        </div>
      </div>
      
      {/* Bio Modal */}
      {shouldShowModal && (
        <BioModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={name}
          title={title}
          bio={bio}
          photo={photo}
        />
      )}
    </>
  );
};

LeadershipCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showBio: PropTypes.bool,
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
  isEven: PropTypes.bool,
  onClick: PropTypes.func
};

export default LeadershipCard; 