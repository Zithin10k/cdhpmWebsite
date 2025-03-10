import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const BioModal = ({ isOpen, onClose, name, title, bio, photo }) => {
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
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div className="modal-content" 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '800px',
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
        
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <div className="modal-header" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '20px',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            {photo && (
              <div className="modal-image" style={{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                marginBottom: '15px',
                border: '3px solid var(--color-primary)'
              }}>
                <img 
                  src={`/assets/People/IMG/${photo}.jpg`} 
                  alt={name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            
            <h2 style={{ 
              fontFamily: 'var(--font-secondary)', 
              color: 'var(--color-text-dark)',
              margin: '0 0 5px 0',
              fontSize: 'var(--font-size-2xl)'
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
              fontSize: 'var(--font-size-md)'
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
  photo: PropTypes.string
};

export default BioModal; 