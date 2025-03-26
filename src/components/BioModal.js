import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const BioModal = ({ isOpen, onClose, name, title, bio, photo, isTeamMember = false }) => {
  const isMobile = window.innerWidth <= 768;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Don't render anything if modal is closed
  if (!isOpen) {
    return null;
  }

  // Determine photo path
  const photoPath = isTeamMember 
    ? `/assets/People/IMG/${photo}.webp` 
    : `/assets/leadership/img/${photo}.webp`;

  const modal = (
    <div 
      className="bio-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: isMobile ? '10px' : '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="bio-modal-content"
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          maxWidth: isMobile ? '100%' : '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="bio-modal-close"
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
            color: '#333',
            zIndex: 10,
            fontWeight: 'bold'
          }}
        >
          ×
        </button>
        
        <div 
          className="bio-modal-body"
          style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            padding: 0
          }}
        >
          {/* Left column - Photo and basic info */}
          <div 
            className="bio-modal-sidebar"
            style={{
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
              textAlign: 'center'
            }}
          >
            <div 
              className="bio-modal-image"
              style={{ 
                width: isMobile ? '140px' : '180px', 
                height: isMobile ? '140px' : '180px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                marginBottom: '25px',
                border: '4px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              <img 
                src={photoPath}
                alt={name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.1);font-size:32px;">${name.charAt(0)}</div>`;
                }}
              />
            </div>
            
            <h2 style={{ 
              fontFamily: 'var(--font-secondary)', 
              color: 'white',
              margin: '0 0 8px 0',
              fontSize: isMobile ? 'var(--font-size-xl)' : 'var(--font-size-2xl)',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              {name}
            </h2>
            
            <h3 style={{ 
              fontFamily: 'var(--font-secondary)', 
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0 0 20px 0',
              fontWeight: '500',
              fontSize: 'var(--font-size-md)',
              letterSpacing: '0.5px'
            }}>
              {title}
            </h3>
            
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              margin: '0 auto'
            }} />
          </div>
          
          {/* Right column - Bio content */}
          <div 
            className="bio-modal-content-area"
            style={{
              width: isMobile ? '100%' : '65%',
              padding: isMobile ? '30px 20px 40px' : '40px',
              position: 'relative'
            }}
          >
            <div 
              className="bio-modal-section-heading"
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                paddingBottom: '15px'
              }}
            >
              <h4 style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-primary)',
                margin: 0,
                fontWeight: '600'
              }}>
                About
              </h4>
            </div>
            
            <div 
              className="bio-modal-bio"
              style={{ 
                lineHeight: '1.8',
                maxHeight: isMobile ? 'auto' : '60vh',
                overflowY: 'auto',
                paddingRight: '10px'
              }}
            >
              <p style={{ 
                fontFamily: 'var(--font-primary)', 
                color: 'var(--color-text-dark)',
                fontSize: 'var(--font-size-md)',
                textAlign: 'left',
                margin: 0
              }}>
                {bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

BioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  isTeamMember: PropTypes.bool
};

export default BioModal; 