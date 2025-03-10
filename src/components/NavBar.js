import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Research', path: '/research' },
    { name: 'Partnership', path: '/partnership' },
    { name: 'Our People', path: '/our-people' },
    { name: 'About Us', path: '/about' },
    { name: 'Work with Us', path: '/work-with-us' },
    { name: 'News', path: '/news' },
  ];

  return (
    <nav className="navbar" style={{
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      position: 'relative',
      zIndex: 999,
      backgroundColor: 'var(--color-white)'
    }}>
      <div className="container navbar-container">
        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          {!isMobile && (
            <Link to="/" className="navbar-brand">
              <span className="brand-text" style={{ 
                color: 'var(--color-blue)', 
                fontFamily: 'var(--font-primary)', 
                fontSize: '1.8rem',
                fontWeight: '700'
              }}>CDHPM</span>
            </Link>
          )}
          
          {!isMobile && (
            <ul className="navbar-nav">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link to={item.path} className="nav-link">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          
          <Link to="/" className="navbar-logo">
            <img src="/assets/images/Logo.png" alt="CDHPM Logo" style={{ height: '50px' }} />
          </Link>
          
          {isMobile && (
            <button 
              className="hamburger-menu" 
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span className={`hamburger-icon ${isOpen ? 'open' : ''}`}></span>
            </button>
          )}
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobile && (
          <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
            <ul className="mobile-nav">
              {navItems.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  <Link 
                    to={item.path} 
                    className="mobile-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar; 