import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

const Research = () => {
  return (
    <motion.div 
      className="page page-with-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero 
        image="/assets/images/HomePageBanner.jpg"
        mainText="Research Initiatives"
        subText="Exploring innovative approaches to digital health and precision medicine to transform healthcare"
        height="450px"
        overlayColor="rgba(235, 27, 47, 0.4)"
      />
      
      <div className="container">
        <div className="section">
          <h2 className="section-title">Our Research Focus</h2>
          <p>At the Centre for Digital Health and Precision Medicine (CDHPM), we conduct cutting-edge research at the intersection of digital technologies, data science, and healthcare. Our research initiatives aim to develop innovative solutions that improve patient outcomes through personalized and precision approaches to medicine.</p>
          
          <div className="mt-5">
            <h3>Key Research Areas</h3>
            <ul className="mt-3">
              <li>AI and machine learning applications in healthcare</li>
              <li>Digital biomarkers and health monitoring</li>
              <li>Precision medicine and personalized healthcare</li>
              <li>Health data analytics and informatics</li>
              <li>Digital therapeutics and interventions</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Research; 