import React from 'react';
import { motion } from 'framer-motion';

const WorkWithUs = () => {
  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div style={{ padding: '2rem 0' }}>
          <h1>Work with Us</h1>
          <p>Opportunities to collaborate and join our team.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkWithUs; 