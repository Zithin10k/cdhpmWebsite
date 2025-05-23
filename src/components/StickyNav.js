import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const StickyNav = ({ sections, activeSection, onSectionClick, isMobile, onStickyChange }) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Add effect to track scroll position and hide main navbar
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Check if we're at the top of the page (with a small buffer)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isTop = scrollTop < 10; // Small buffer to consider as "top"
      
      // Update state
      setIsAtTop(isTop);
      
      // Find the navbar element and toggle its visibility
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (isTop) {
          // At top - show navbar
          navbar.style.transform = 'translateY(0)';
          navbar.style.opacity = '1';
        } else {
          // Not at top - hide navbar
          navbar.style.transform = 'translateY(-100%)';
          navbar.style.opacity = '0';
        }
      }

      // Check if the sticky nav is sticking
      const stickyNav = document.querySelector('.sticky-nav');
      if (stickyNav) {
        const stickyPosition = stickyNav.getBoundingClientRect().top;
        const newIsSticky = stickyPosition <= 0;
        setIsSticky(newIsSticky);
        // Notify parent component of sticky state change
        if (onStickyChange) {
          onStickyChange(newIsSticky);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Restore navbar visibility when component unmounts
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
      }
    };
  }, [onStickyChange]);

  // Handle section selection and URL update
  const handleSectionSelect = (sectionId, event) => {
    // Prevent default browser behavior
    if (event) {
      event.preventDefault();
    }
    
    // First, call the click handler to scroll to the section
    onSectionClick(sectionId);
    
    // Update the URL without causing a navigation event
    const newPath = `/our-people/${sectionId}`;
    
    // Use history.replaceState to update URL without navigation
    window.history.replaceState(
      { scrollPreservation: true },
      '',
      newPath
    );
  };

  // If no sections are provided or activeSection is null, don't render
  if (!sections || sections.length === 0 || !activeSection) {
    return null;
  }

  return (
    <div 
      className="sticky-nav" 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'var(--color-white)',
        boxShadow: isSticky ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        transition: 'box-shadow 0.3s ease',
        willChange: 'position, top'
      }}
    >
      {isMobile ? (
        // Mobile view - dropdown selector
        <div style={{ 
          width: '90%', 
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <select 
            value={activeSection} 
            onChange={(e) => handleSectionSelect(e.target.value, e)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid var(--color-gray-300)',
              borderRadius: '4px',
              backgroundColor: 'var(--color-white)',
              fontSize: 'var(--font-size-base)',
              fontFamily: 'var(--font-primary)',
              cursor: 'pointer'
            }}
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // Desktop view - horizontal tabs
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={(e) => handleSectionSelect(section.id, e)}
              style={{
                padding: '10px 20px',
                border: '1px solid var(--color-gray-300)',
                borderRadius: '4px',
                backgroundColor: activeSection === section.id ? 'var(--color-primary)' : 'var(--color-white)',
                color: activeSection === section.id ? 'var(--color-white)' : 'var(--color-black)',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-base)',
                fontWeight: '500',
                transition: 'all 0.2s ease-in-out',
                flex: 1,
                textAlign: 'center'
              }}
            >
              {section.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

StickyNav.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ref: PropTypes.object
  })).isRequired,
  activeSection: PropTypes.string,
  onSectionClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onStickyChange: PropTypes.func
};

export default StickyNav; 