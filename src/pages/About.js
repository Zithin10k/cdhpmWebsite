import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

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
        image="/assets/images/HomePageAboutBanner.png"
        mainText="About CDHPM"
        subText="Learn about our mission, vision, and the team behind the Centre for Digital Health and Precision Medicine"
        height="500px"
        overlayColor="rgba(0, 121, 160, 0.4)"
      />
      
      <div className="container">
        <div className="section">
          <h2 className="section-title">Our Mission</h2>
          <p>The Centre for Digital Health and Precision Medicine (CDHPM) is dedicated to advancing healthcare through innovative digital technologies and precision medicine approaches.</p>
          
          <h2 className="section-title mt-5">Our Vision</h2>
          <p>To revolutionize healthcare delivery and patient outcomes by harnessing the power of digital health technologies, data analytics, and precision medicine to create personalized, effective, and accessible healthcare solutions.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default About; 