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
        image="/assets/images/Research.jpg"
        mainText="Research Initiatives"
        subText="Exploring innovative approaches to digital health and precision medicine to transform healthcare"
        height="450px"
        overlayColor="rgba(0, 0, 0, 0.4)"
      />
      
      <div className="container">
        <div className="section text-left">
          <h2 className="section-title text-left">Our Research Focus</h2>
          <p className="text-left">The Centre for Digital Health and Precision Medicine aims to leverage the extensive longitudinal patient database of the Apollo Hospitals Group, and datasets of the University of Leicester and other Consortium Partners to deliver improved population health with a global perspective through better disease prediction and prevention.</p>
          <p className="text-left">Our work is dedicated to making a tangible difference in patient lives and healthcare systems worldwide, leading to improved and earlier detection, diagnosis and management of multiple acute and long-term conditions in hospital and community settings.</p>
          
          <div className="mt-5">
            <h3 className="text-left">Work Pending.....</h3>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Research; 