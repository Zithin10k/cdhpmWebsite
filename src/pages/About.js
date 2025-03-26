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
        image="/assets/images/AboutBanner.jpeg"
        mainText="About CDHPM"
        subText="Learn about our mission, vision, and the team behind the Centre for Digital Health and Precision Medicine"
        height="500px"
        overlayColor="rgba(0, 0, 0, 0.4)"
      />
      
      <div className="container">
        <div className="section text-left">
          <h2 className="section-title ">Our Mission</h2>
          <p>TThe Centre operates through two primary hubs based at The Apollo University in Chittoor, India, and at the British Heart Foundation Cardiovascular Research Centre at the University of Leicester in the United Kingdom. However, the Centre has a federated structure with its Faculty spread across the Apollo Hospitals network, The Apollo University and the University of Leicester as well amongst external partner organisations. This structure combines deep expertise and resources, driving our shared vision of a future where healthcare is personalized, data-driven, and transformative</p>
          
          
        </div>
      </div>
    </motion.div>
  );
};

export default About; 