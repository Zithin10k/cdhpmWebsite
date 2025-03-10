import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Video = ({ thumbnailUrl, title, youtubeUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYoutubeVideoId(youtubeUrl);
  
  const handleClick = () => {
    setIsPlaying(true);
  };
  
  return (
    <div 
      className="video-container" 
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '100%',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div 
        className="thumbnail-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '0',
          paddingBottom: '56.25%' /* 16:9 aspect ratio */
        }}
      >
        {!isPlaying ? (
          <>
            <img 
              src={thumbnailUrl} 
              alt={title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div 
              className="gradient-overlay"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '40%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0) 100%)'
              }}
            ></div>
            <div 
              className="title-container"
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div 
                className="play-icon"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(243, 0, 0, 0.77)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: '24px',
                    height: '24px',
                    fill: '#fff'
                  }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 
                className="video-title"
                style={{
                  margin: 0,
                  color: 'white',
                  fontSize: 'var(--font-size-lg, 1.2rem)',
                  fontWeight: '600',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                {title}
              </h3>
            </div>
          </>
        ) : (
          <div 
            className="iframe-container"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

Video.propTypes = {
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  youtubeUrl: PropTypes.string.isRequired
};

export default Video; 