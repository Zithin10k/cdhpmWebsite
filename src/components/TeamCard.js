import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BioModal from './BioModal';

const TeamCard = ({ name, position, bio, photoName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="team-card" 
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          marginBottom: '15px',
          height: 'auto',
          display: 'inline-block',
          breakInside: 'avoid',
          WebkitColumnBreakInside: 'avoid',
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          setIsHovered(true);
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }}
      >
        <img 
          src={`/assets/People/IMG/${photoName}.jpg`} 
          alt={name}
          style={{
            width: '100%',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
        
        <div 
          className="team-card-info" 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '15px',
            transform: `translateY(${isHovered ? '0' : '100%'})`,
            transition: 'transform 0.3s ease',
          }}
        >
          <h3 style={{ 
            margin: '0 0 5px 0',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            {name}
          </h3>
          <p style={{ 
            margin: '0',
            fontSize: '0.85rem',
            opacity: '0.9'
          }}>
            {position}
          </p>
        </div>
      </div>

      <BioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        title={position}
        bio={bio}
        photo={photoName}
        isTeamMember={true}
      />
    </>
  );
};

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  photoName: PropTypes.string.isRequired
};

export default TeamCard; 