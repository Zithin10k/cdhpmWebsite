import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';
import Hero from '../components/Hero';
const Partnership = () => {
  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero 
        image="/assets/images/partnerBanner.png"
        mainText="Strategic Partnerships"
        subText="Collaborating for innovation and impact in healthcare"
        height="500px"
        overlayColor="rgba(0, 0, 0, 0.4)"
      />

      {/* Partnership Description Section */}
      <div className="container mt-5">
        <div className="partnership-content">
          <p className="partnership-text">
            Our partnerships extend across diverse sectors, creating an ecosystem that fosters innovation, collaboration, and transformative impact. We actively engage with industry leaders, technology pioneers, and research institutions to co-create solutions that address complex challenges and shape the future of healthcare.
          </p>
          <p className="partnership-text">
            These partnerships enable us to blend multidisciplinary insights, bridge gaps between research and application, and develop solutions that are both innovative and practical, ensuring meaningful progress in healthcare delivery and outcomes.
          </p>
        </div>
      </div>

      {/* Academic Partners Section */}
      <div className="container mt-5 mb-5">
        <h2 className="section-title">Academic Partners</h2>
        <div className="partner-logos">
          <div className="logo-container">
            <img 
              src="/assets/images/TCFEHR-logo.png" 
              alt="TCFEHR Logo" 
              className="partner-logo"
            />
          </div>
          <div className="logo-container">
            <img 
              src="/assets/images/uhl_nhs_logo.svg" 
              alt="UHL NHS Logo" 
              className="partner-logo"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Partnership; 