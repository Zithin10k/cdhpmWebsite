import React, { useState, useEffect } from 'react';
import './BlurUpImage.css';

const BlurUpImage = ({ src, alt, className = '', style = {} }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [highResSrc, setHighResSrc] = useState('');
  const [lowResSrc, setLowResSrc] = useState('');

  useEffect(() => {
    // Create low-res version path by adding 'low-res' folder
    const pathParts = src.split('/');
    const fileName = pathParts.pop();
    const lowResPath = [...pathParts, 'low-res', fileName].join('/');
    
    setHighResSrc(src);
    setLowResSrc(lowResPath);
  }, [src]);

  return (
    <div className="blur-up-container" style={style}>
      {!isLoaded && (
        <img
          src={lowResSrc}
          alt={alt}
          className={`blur-up-image ${className}`}
          style={{ filter: 'blur(10px)' }}
        />
      )}
      <img
        src={highResSrc}
        alt={alt}
        className={`blur-up-image ${className} ${isLoaded ? 'loaded' : ''}`}
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
};

export default BlurUpImage; 