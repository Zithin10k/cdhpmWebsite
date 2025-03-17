import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BioModal = ({ isOpen, onClose, name, title, bio, photo, isTeamMember = false }) => {
  // Add window width state for responsive design
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [animationState, setAnimationState] = useState('closed');
  const isMobile = windowWidth <= 768;

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

  // Handle animation states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setAnimationState('opening');
      const timer = setTimeout(() => setAnimationState('open'), 50);
      return () => clearTimeout(timer);
    } else {
      if (animationState === 'open') {
        setAnimationState('closing');
        const timer = setTimeout(() => setAnimationState('closed'), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (animationState === 'closed' && !isOpen) return null;

  // Determine the correct photo path based on whether it's a team member or leadership
  // Use the photo property directly as it's already in the correct format in the JSON
  const photoPath = isTeamMember 
    ? `/assets/People/IMG/${photo}.jpg` 
    : `/assets/leadership/img/${photo}.jpg`;

  return (
    <div className="modal-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: isMobile ? '10px' : '20px',
        opacity: animationState === 'opening' || animationState === 'closing' ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out',
      }}
      onClick={onClose}
    >
      <div className="modal-content" 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          maxWidth: isMobile ? '100%' : '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
          transform: animationState === 'opening' || animationState === 'closing' 
            ? 'scale(0.95) translateY(20px)' 
            : 'scale(1) translateY(0)',
          opacity: animationState === 'opening' || animationState === 'closing' ? 0 : 1,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="modal-close" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            cursor: 'pointer',
            color: 'var(--color-text-dark)',
            zIndex: 10,
            transition: 'background-color 0.2s ease',
            fontWeight: 'bold',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
        >
          ×
        </button>
        
        <div className="modal-body" style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          padding: 0,
        }}>
          {/* Left column - Photo and basic info */}
          <div className="modal-sidebar" style={{
            width: isMobile ? '100%' : '35%',
            backgroundColor: 'var(--color-primary)',
            backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            color: 'white',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: isMobile ? '0' : '12px',
            borderTopRightRadius: isMobile ? '12px' : '0',
            padding: isMobile ? '30px 20px' : '40px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
            {photo && (
              <div className="modal-image" style={{ 
                width: isMobile ? '140px' : '180px', 
                height: isMobile ? '140px' : '180px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                marginBottom: '25px',
                border: '4px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
              }}>
                <img 
                  src={photoPath} 
                  alt={name} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${photoPath}`);
                    e.target.onerror = null;
                    e.target.src = '/assets/images/placeholder-profile.jpg';
                  }}
                />
              </div>
            )}
            
            <h2 style={{ 
              fontFamily: 'var(--font-secondary)', 
              color: 'white',
              margin: '0 0 8px 0',
              fontSize: isMobile ? 'var(--font-size-xl)' : 'var(--font-size-2xl)',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}>
              {name}
            </h2>
            
            <h3 style={{ 
              fontFamily: 'var(--font-secondary)', 
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0 0 20px 0',
              fontWeight: '500',
              fontSize: 'var(--font-size-md)',
              letterSpacing: '0.5px',
            }}>
              {title}
            </h3>
            
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              margin: '0 auto',
            }} />
          </div>
          
          {/* Right column - Bio content */}
          <div className="modal-content-area" style={{
            width: isMobile ? '100%' : '65%',
            padding: isMobile ? '30px 20px 40px' : '40px',
            position: 'relative',
          }}>
            <div className="section-heading" style={{
              marginBottom: '20px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              paddingBottom: '15px',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-primary)',
                margin: 0,
                fontWeight: '600',
              }}>
                About
              </h4>
            </div>
            
            <div className="modal-bio" style={{ 
              lineHeight: '1.8',
              maxHeight: isMobile ? 'auto' : '60vh',
              overflowY: 'auto',
              paddingRight: '10px',
            }}>
              <p style={{ 
                fontFamily: 'var(--font-primary)', 
                color: 'var(--color-text-dark)',
                fontSize: 'var(--font-size-md)',
                textAlign: 'left',
                margin: 0,
              }}>
                {bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  photo: PropTypes.string,
  isTeamMember: PropTypes.bool
};

export default BioModal; 