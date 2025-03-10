import React from 'react';
import { motion } from 'framer-motion';

const News = () => {
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
          <h1>News</h1>
          <p>Latest updates and announcements from CDHPM.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default News; 