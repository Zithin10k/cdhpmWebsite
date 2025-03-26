import React, { useState, useEffect } from 'react';
import './BlurUpImage.css';

const BlurUpImage = ({ src, blurSrc, alt, className = '', style = {}, onError }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [lowResLoaded, setLowResLoaded] = useState(false);
  const [lowResError, setLowResError] = useState(false);
  const [highResSrc, setHighResSrc] = useState('');
  const [lowResSrc, setLowResSrc] = useState('');

  // Reset state when src changes
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setLoadError(false);
    setLowResLoaded(false);
    setLowResError(false);
    
    // If blurSrc is provided, use it directly; otherwise, create a path
    let lowResPath;
    if (blurSrc) {
      lowResPath = blurSrc;
    } else {
      // Create low-res version path by adding 'low-res' folder
      const pathParts = src.split('/');
      const fileName = pathParts.pop();
      
      // Extract file name without extension to handle potential extension mismatch
      const fileNameParts = fileName.split('.');
      const extension = fileNameParts.pop();
      const baseFileName = fileNameParts.join('.');
      
      // Use webp extension for low-res version
      lowResPath = [...pathParts, 'low-res', `${baseFileName}.webp`].join('/');
    }
    
    setHighResSrc(src);
    setLowResSrc(lowResPath);
    
    // Check if high-res image is already cached
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      console.error(`Failed to load high-res image: ${src}`);
      // If high-res image fails, try to show at least something
      setIsLoaded(false);
      setLoadError(true);
      // Propagate error to parent component if onError callback is provided
      if (onError && typeof onError === 'function') {
        onError();
      }
    };
    img.src = src;
    // If the image is cached, the onload event might fire immediately before we set the handler
    if (img.complete && img.naturalWidth > 0) setIsLoaded(true);
  }, [src, blurSrc, onError]);

  // Handle critical error case
  if (loadError && lowResError) {
    // If both high-res and low-res images fail to load
    return (
      <div 
        className="blur-up-error" 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          color: '#666',
          fontSize: '14px',
          padding: '20px',
          borderRadius: '4px',
        }}
      >
        {alt ? alt.charAt(0) : '!'}
      </div>
    );
  }

  return (
    <div className="blur-up-container" style={style}>
      {!isLoaded && !lowResError && (
        <img
          src={lowResSrc}
          alt={alt}
          className={`blur-up-image ${className}`}
          style={{ filter: 'blur(10px)' }}
          onLoad={() => setLowResLoaded(true)}
          onError={() => {
            console.error(`Failed to load low-res image: ${lowResSrc}`);
            setLowResError(true);
          }}
        />
      )}
      <img
        src={highResSrc}
        alt={alt}
        className={`blur-up-image ${className} ${isLoaded ? 'loaded' : ''}`}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.error(`Failed to load image: ${highResSrc}`);
          // If there's a problem loading the image, show a fallback
          e.target.style.display = 'none';
          setLoadError(true);
          // Propagate error to parent component if onError callback is provided
          if (onError && typeof onError === 'function') {
            onError();
          }
        }}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
};

export default BlurUpImage; 