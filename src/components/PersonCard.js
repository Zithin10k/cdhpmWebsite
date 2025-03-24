import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BioModal from './BioModal';
import BlurUpImage from './BlurUpImage';

const PersonCard = ({ 
  person,
  windowWidth
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  // Determine the photo path based on the source
  const getPhotoPath = () => {
    // Use the photo property directly as it's already in the correct format in the JSON
    if (person.photoSource === 'leadership') {
      return `/assets/leadership/img/${person.photo}.jpg`;
    } else {
      // For people images, use the photo property directly
      return `/assets/People/IMG/${person.photo}.jpg`;
    }
  };

  // Function to get the blur image path
  const getBlurPhotoPath = () => {
    // Convert the photo name to match the low-res format
    const blurPhotoName = person.photo.replace(/\.(jpg|jpeg|png)$/i, '');
    return `/assets/images/low-res/${blurPhotoName}.jpg`;
  };

  // Function to handle card click
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // Determine card type based on screen size and cardType property
  const getCardType = () => {
    // On mobile, all cards become type 4 (small vertical cards)
    if (isMobile) {
      return 4;
    }
    return person.cardType;
  };

  const cardType = getCardType();

  // Card Type 1: Horizontal card with image on the left and data on the right
  if (cardType === 1) {
    return (
      <>
        <div 
          className="person-card horizontal-left"
          style={{
            width: '100%',
            maxWidth: isTablet ? '90%' : '1100px',
            height: 'auto',
            minHeight: isTablet ? '300px' : '350px',
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            margin: '30px auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }
          }}
        >
          {/* Image */}
          <div 
            className="person-card-image" 
            style={{
              width: '40%',
              minHeight: '350px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <BlurUpImage 
              src={getPhotoPath()} 
              blurSrc={getBlurPhotoPath()}
              alt={person.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          
          {/* Content */}
          <div 
            className="person-card-content" 
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '60%',
              textAlign: 'left'
            }}
          >
            <h3 
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'var(--font-size-xl)',
                margin: '0 0 10px 0',
                color: 'var(--color-text-dark)',
                textAlign: 'left'
              }}
            >
              {person.name}
            </h3>
            
            <p 
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'var(--font-size-md)',
                color: 'var(--color-primary)',
                margin: '0 0 20px 0',
                fontWeight: '500',
                textAlign: 'left'
              }}
            >
              {person.position}
            </p>
            
            {/* Bio */}
            <p 
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-md)',
                color: 'var(--color-text)',
                margin: '0 0 20px 0',
                lineHeight: '1.6',
                overflow: 'auto',
                textAlign: 'left'
              }}
            >
              {person.bio}
            </p>
            
            <button
              onClick={handleCardClick}
              style={{
                alignSelf: 'flex-start',
                padding: '10px 20px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-md)',
                fontWeight: '500',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-dark, #0056b3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              }}
            >
              Know more
            </button>
          </div>
        </div>
        
        <BioModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={person.name}
          title={person.position}
          bio={person.bio}
          photo={person.photo}
          isTeamMember={person.photoSource === 'people'}
        />
      </>
    );
  }

  // Card Type 2: Horizontal card with image on the right and data on the left
  if (cardType === 2) {
    return (
      <>
        <div 
          className="person-card horizontal-right"
          style={{
            width: '100%',
            maxWidth: isTablet ? '90%' : '1100px',
            height: 'auto',
            minHeight: isTablet ? '300px' : '350px',
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            margin: '30px auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }
          }}
        >
          {/* Image */}
          <div 
            className="person-card-image" 
            style={{
              width: '40%',
              minHeight: '350px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <BlurUpImage 
              src={getPhotoPath()} 
              blurSrc={getBlurPhotoPath()}
              alt={person.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          
          {/* Content */}
          <div 
            className="person-card-content" 
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '60%',
              textAlign: 'left'
            }}
          >
            <h3 
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'var(--font-size-xl)',
                margin: '0 0 10px 0',
                color: 'var(--color-text-dark)',
                textAlign: 'left'
              }}
            >
              {person.name}
            </h3>
            
            <p 
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'var(--font-size-md)',
                color: 'var(--color-primary)',
                margin: '0 0 20px 0',
                fontWeight: '500',
                textAlign: 'left'
              }}
            >
              {person.position}
            </p>
            
            {/* Bio */}
            <p 
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-md)',
                color: 'var(--color-text)',
                margin: '0 0 20px 0',
                lineHeight: '1.6',
                overflow: 'auto',
                textAlign: 'left'
              }}
            >
              {person.bio}
            </p>
            
            <button
              onClick={handleCardClick}
              style={{
                alignSelf: 'flex-start',
                padding: '10px 20px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-md)',
                fontWeight: '500',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-dark, #0056b3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              }}
            >
              Know more
            </button>
          </div>
        </div>
        
        <BioModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={person.name}
          title={person.position}
          bio={person.bio}
          photo={person.photo}
          isTeamMember={person.photoSource === 'people'}
        />
      </>
    );
  }

  // Card Type 3: Vertical card with plus icon (big, 2 per row)
  if (cardType === 3) {
    return (
      <>
        <div 
          className="person-card vertical-large"
          style={{
            width: isTablet ? '100%' : 'calc(50% - 15px)',
            maxWidth: isTablet ? '350px' : '500px',
            height: isTablet ? '480px' : '550px',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            margin: isMobile ? '15px 0' : '15px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }
          }}
        >
          {/* Image */}
          <div 
            className="person-card-image" 
            style={{
              width: '100%',
              height: '85%',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <BlurUpImage 
              src={getPhotoPath()} 
              blurSrc={getBlurPhotoPath()}
              alt={person.name}
              style={{
                width: 'auto',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          
          {/* Content */}
          <div 
            className="person-card-content" 
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              textAlign: 'left'
            }}
          >
            <h3 
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: isMobile 
                  ? 'var(--font-size-md)' 
                  : 'var(--font-size-lg)',
                margin: '0 0 8px 0',
                color: 'var(--color-text-dark)',
                textAlign: 'left'
              }}
            >
              {person.name}
            </h3>
            
            <p 
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: isMobile ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
                color: 'var(--color-primary)',
                margin: '0 0 10px 0',
                fontWeight: '500',
                textAlign: 'left'
              }}
            >
              {person.position}
            </p>
            
            {/* Bio excerpt */}
            <p 
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: isMobile ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
                color: 'var(--color-text)',
                margin: '0 0 15px 0',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'left'
              }}
            >
              {person.bio}
            </p>
            
            <button
              onClick={handleCardClick}
              style={{
                alignSelf: 'flex-start',
                marginTop: 'auto',
                padding: '8px 15px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-dark, #0056b3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              }}
            >
              Know more
            </button>
          </div>
        </div>
        
        {/* Bio Modal */}
        <BioModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={person.name}
          title={person.position}
          bio={person.bio}
          photo={person.photo}
          isTeamMember={person.photoSource === 'people'}
        />
      </>
    );
  }

  // Card Type 4: Vertical card with plus icon (small, 4 per row or 1 per row on mobile)
  return (
    <>
      <div 
        className="person-card vertical-small"
        style={{
          height: '100%',
          width: 'auto',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          marginBottom: '15px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
        }}
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
          }
        }}
      >
        <div style={{ height: '300px', overflow: 'hidden' }}>
          <BlurUpImage 
            src={getPhotoPath()} 
            blurSrc={getBlurPhotoPath()}
            alt={person.name}
            style={{
              width: 'auto',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        
        <div 
          className="person-card-info" 
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <h3 style={{ 
            margin: '0 0 5px 0',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--color-text-dark)',
          }}>
            {person.name}
          </h3>
          <p style={{ 
            margin: '0 0 15px 0',
            fontSize: '0.85rem',
            color: 'var(--color-primary)',
            fontWeight: '500',
          }}>
            {person.position}
          </p>
          
          <button
            onClick={handleCardClick}
            style={{
              marginTop: 'auto',
              padding: '8px 15px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-dark, #0056b3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
          >
            Know more
          </button>
        </div>
      </div>

      <BioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={person.name}
        title={person.position}
        bio={person.bio}
        photo={person.photo}
        isTeamMember={person.photoSource === 'people'}
      />
    </>
  );
};

PersonCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    cardType: PropTypes.number.isRequired,
    photoSource: PropTypes.string.isRequired,
    area_of_focus: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  windowWidth: PropTypes.number.isRequired
};

export default PersonCard; 