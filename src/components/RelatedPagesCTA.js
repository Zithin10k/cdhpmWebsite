import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RelatedPagesCTA = ({ 
  title = "You may also be interested in exploring",
  firstButtonText = "Our Research",
  firstButtonLink = "/research",
  secondButtonText = "Work With Us",
  secondButtonLink = "/work-with-us",
  backgroundColor = "#f2f2f2",
  secondButtonColor = "#EB1B2F"
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;

  return (
    <section style={{
      padding: '40px 20px',
      background: backgroundColor,
      color: '#333'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'center',
        justifyContent: 'space-between'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: isMobile ? 'center' : 'left',
            marginBottom: isMobile ? '20px' : '0'
          }}
        >
          <h3 style={{
            fontSize: isMobile ? 'var(--font-size-lg)' : '22px',
            fontWeight: '600',
            color: '#555',
            margin: '0',
            fontFamily: 'var(--font-secondary)'
          }}>
            {title}
          </h3>
        </motion.div>
        
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '15px',
          justifyContent: 'center'
        }}>
          <motion.a
            href={firstButtonLink}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '10px 20px',
              background: 'white',
              color: '#444',
              fontWeight: '500',
              textDecoration: 'none',
              borderRadius: '2px',
              fontSize: 'var(--font-size-base)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
              display: 'inline-block'
            }}
          >
            {firstButtonText}
          </motion.a>
          
          <motion.a
            href={secondButtonLink}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '10px 20px',
              background: secondButtonColor,
              color: 'white',
              fontWeight: '500',
              textDecoration: 'none',
              borderRadius: '2px',
              fontSize: 'var(--font-size-base)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              display: 'inline-block'
            }}
          >
            {secondButtonText}
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default RelatedPagesCTA; 