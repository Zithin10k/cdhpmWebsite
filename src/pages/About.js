import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

const OrganizationModal = ({ isOpen, onClose, name, description, logo, website, buildingImage }) => {
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

  if (!isOpen) return null;
  
  const isMobile = window.innerWidth <= 768;
  
  return (
    <motion.div 
      className="org-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: isMobile ? '10px' : '20px'
      }}
      onClick={onClose}
    >
      <motion.div 
        className="org-modal-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '2px',
          maxWidth: isMobile ? '95%' : '90%',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left column - Images */}
        <div 
          style={{
            width: isMobile ? '100%' : '35%',
            position: 'relative',
            overflow: 'hidden',
            borderTopLeftRadius: '2px',
            borderBottomLeftRadius: isMobile ? '0' : '2px',
            borderTopRightRadius: isMobile ? '2px' : '0'
          }}
        >
          {/* Building image */}
          <div 
            style={{
              height: isMobile ? '180px' : '100%',
              width: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 1
              }}
            />
            <img 
              src={buildingImage}
              alt={`${name} building`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            {/* Logo overlay */}
            <div 
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2
              }}
            >
              <div 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  padding: '15px',
                  width: isMobile ? '200px' : '240px',
                  height: isMobile ? '90px' : '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                }}
              >
                <img 
                  src={logo}
                  alt={name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Content */}
        <div 
          style={{
            width: isMobile ? '100%' : '65%',
            padding: '30px 40px',
            position: 'relative',
            overflow: 'auto'
          }}
        >
          <button 
            className="org-modal-close"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'rgba(0, 0, 0, 0.05)',
              border: 'none',
              borderRadius: '2px',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#333',
              zIndex: 10,
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
          >
            ×
          </button>
          
          <h2 
            style={{
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-secondary)',
              fontSize: 'var(--font-size-2xl)',
              marginBottom: '5px',
              paddingBottom: '10px',
              borderBottom: '2px solid var(--color-gray-200)'
            }}
          >
            About {name}
          </h2>
          
          <div 
            style={{
              margin: '20px 0 25px',
              color: 'var(--color-gray-800)',
              lineHeight: '1.7',
              fontSize: 'var(--font-size-base)',
              textAlign: 'justify'
            }}
          >
            <p>{description}</p>
          </div>
          
          <a 
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '2px',
              fontWeight: 'bold',
              textAlign: 'center',
              transition: 'background-color 0.3s ease',
              boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-primary-dark)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
          >
            Visit Website
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const OrganizationLogos = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;
  
  const organizations = [
    {
      id: 'leicester',
      name: 'University of Leicester',
      logo: '/assets/images/UniOfLisLogo.png',
      description: 'The University of Leicester is a leading UK University committed to international excellence through the creation of world-changing research and high-quality, inspirational teaching. As a research-intensive institution, Leicester delivers teaching that is driven by cutting-edge research, and enables graduates to go on to competitive employment or continued academic study.',
      website: 'https://le.ac.uk',
      buildingImage: '/assets/images/uniOfLBuilding.webp'
    },
    {
      id: 'apollo-hospitals',
      name: 'Apollo Hospitals',
      logo: '/assets/images/Apollo_Hospitals.jpg',
      description: 'Apollo Hospitals is one of the largest healthcare providers in Asia, with a network of hospitals, clinics, and diagnostic centers. Since its founding in 1983, Apollo has been at the forefront of bringing international quality healthcare to India. With its advanced medical technology and distinguished physicians, Apollo continues to set new standards in healthcare delivery.',
      website: 'https://www.apollohospitals.com',
      buildingImage: '/assets/images/Apollo-Hospitals-Hyderabad-Building.webp'
    },
    {
      id: 'apollo-uni',
      name: 'The Apollo University',
      logo: '/assets/images/apollo_uni.png',
      description: 'The Apollo University, a division of AHERF (Apollo Hospitals Educational and Research Foundation), is dedicated to advancing healthcare education and research. By combining academic excellence with practical experience, Apollo University prepares the next generation of healthcare professionals to address global health challenges through innovation and compassionate care.',
      website: 'https://apollouniversity.edu.in',
      buildingImage: '/assets/images/apolloUniBuilding.webp'
    }
  ];
  
  const openModal = (org) => {
    setSelectedOrg(org);
  };
  
  const closeModal = () => {
    setSelectedOrg(null);
  };

  // Style for the shine effect - defined once to be used on all logos
  const shineKeyframes = `
    @keyframes shine {
      0% { left: -100%; }
      20% { left: 100%; }
      100% { left: 100%; }
    }
  `;
  
  return (
    <div className="partner-organizations">
      <style>{shineKeyframes}</style>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-evenly',
        gap: isMobile ? '30px' : '50px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {organizations.map((org, index) => (
          <motion.div
            key={org.id}
            className="org-logo"
            onClick={() => openModal(org)}
            whileHover={{ 
              scale: 1.08,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ 
              cursor: 'pointer',
              padding: isMobile ? '15px' : '25px',
              borderRadius: '2px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobile ? '190px' : '300px',
              height: isMobile ? '100px' : '160px',
              border: '1px solid var(--color-gray-200)',
              transition: 'box-shadow 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Enhanced shine effect for main logos */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                transform: 'skewX(-25deg)',
                animation: `shine ${2.5 + index * 0.3}s infinite`,
                animationDelay: `${index * 0.8}s`
              }}
            />
            <img 
              src={org.logo} 
              alt={org.name} 
              style={{
                maxWidth: '95%',
                maxHeight: '90%',
                objectFit: 'contain',
              }}
            />
          </motion.div>
        ))}
      </div>
      
      <div style={{ 
        margin: '50px auto 0',
        maxWidth: '85%',
        padding: '0 20px',
        textAlign: 'justify',
        color: 'var(--color-gray-700)',
        lineHeight: '1.7',
        fontSize: isMobile ? 'var(--font-size-sm)' : 'var(--font-size-base)',
        fontFamily: 'var(--font-primary)'
      }}>
        <p>
          The Centre operates through two primary hubs based at The Apollo University in Chittoor, India, and at the British Heart Foundation Cardiovascular Research Centre at the University of Leicester in the United Kingdom. However, the Centre has a federated structure with its Faculty spread across the Apollo Hospitals network, The Apollo University and the University of Leicester as well amongst external partner organisations. This structure combines deep expertise and resources, driving our shared vision of a future where healthcare is personalized, data-driven, and transformative.
        </p>
      </div>
      
      {selectedOrg && (
        <OrganizationModal
          isOpen={true}
          onClose={closeModal}
          name={selectedOrg.name}
          description={selectedOrg.description}
          logo={selectedOrg.logo}
          website={selectedOrg.website}
          buildingImage={selectedOrg.buildingImage}
        />
      )}
    </div>
  );
};

const About = () => {
  return (
    <motion.div
      className="page page-with-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero
        image="/assets/images/AboutBanner.jpeg"
        mainText="Who we are"
        subText="The Centre for Digital Health and Precision Medicine
is a partnership between three globally renowned institutions."
        height="500px"
        overlayColor="rgba(0, 0, 0, 0.4)"
      />
      
      <section style={{ 
        padding: '50px 15px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: '#f9f9f9'
      }}>
        <OrganizationLogos />
      </section>

    </motion.div>
  );
};

export default About; 