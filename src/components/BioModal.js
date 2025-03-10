import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BioModal = ({ isOpen, onClose, name, title, bio, photo, isTeamMember = false }) => {
  // Add window width state for responsive design
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
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

  if (!isOpen) return null;

  // Determine the correct photo path based on whether it's a team member or leadership
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: isMobile ? '10px' : '20px'
      }}
      onClick={onClose}
    >
      <div className="modal-content" 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: isMobile ? '100%' : '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="modal-close" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'var(--color-primary)',
            zIndex: 10
          }}
        >
          ×
        </button>
        
        <div className="modal-body" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          padding: isMobile ? '20px 15px' : '30px' 
        }}>
          <div className="modal-header" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '20px',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            {photo && (
              <div className="modal-image" style={{ 
                width: isMobile ? '120px' : '150px', 
                height: isMobile ? '120px' : '150px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                marginBottom: '15px',
                border: '3px solid var(--color-primary)'
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
              color: 'var(--color-text-dark)',
              margin: '0 0 5px 0',
              fontSize: isMobile ? 'var(--font-size-xl)' : 'var(--font-size-2xl)'
            }}>
              {name}
            </h2>
            
            <h3 style={{ 
              fontFamily: 'var(--font-secondary)', 
              color: 'var(--color-primary)',
              margin: '0',
              fontWeight: '500',
              fontSize: 'var(--font-size-md)'
            }}>
              {title}
            </h3>
          </div>
          
          <div className="modal-bio" style={{ lineHeight: '1.6' }}>
            <p style={{ 
              fontFamily: 'var(--font-primary)', 
              color: 'var(--color-text-dark)',
              fontSize: 'var(--font-size-md)',
              textAlign: isMobile ? 'left' : 'justify'
            }}>
              {bio}
            </p>
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