import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import LeadershipCard from '../components/LeadershipCard';
import QuotedTagline from '../components/QuotedTagline';
import TeamCard from '../components/TeamCard';

const OurPeople = () => {
  const [leadershipData, setLeadershipData] = useState(null);
  const [peopleData, setPeopleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    // Fetch leadership data
    Promise.all([
      fetch('/assets/leadership/leadership.json').then(response => response.json()),
      fetch('/assets/People/people.json').then(response => response.json())
    ])
      .then(([leadershipJson, peopleJson]) => {
        setLeadershipData(leadershipJson);
        setPeopleData(peopleJson);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Determine number of cards per row based on screen size
  const getGridStyles = (size) => {
    // Mobile view (up to 768px)
    if (windowWidth <= 768) {
      return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '30px auto',
        maxWidth: '100%',
        padding: '0 15px'
      };
    }
    
    // Tablet view (768px - 1024px)
    if (windowWidth <= 1024) {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '30px auto',
        maxWidth: '900px',
        gap: '20px'
      };
    }
    
    // Desktop view (above 1024px)
    return {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: '40px auto',
      maxWidth: '1200px',
      gap: size === 'large' ? '30px' : '20px'
    };
  };

  // Section spacing based on screen size
  const getSectionSpacing = () => {
    return windowWidth <= 768 
      ? { marginBottom: '80px', paddingTop: '40px' } 
      : { marginBottom: '120px', paddingTop: '50px' };
  };

  // Get team collage styles based on screen size
  const getTeamCollageStyles = () => {
    // Base styles for all screen sizes
    const baseStyles = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      margin: '30px auto',
      maxWidth: '1200px',
      padding: '0 15px'
    };
    
    // Mobile view (up to 768px)
    if (windowWidth <= 768) {
      return {
        ...baseStyles,
        columnCount: 2,
        columnGap: '15px',
        display: 'block' // Override flex for column layout
      };
    }
    
    // Tablet view (768px - 1024px)
    if (windowWidth <= 1024) {
      return {
        ...baseStyles,
        columnCount: 3,
        columnGap: '15px',
        display: 'block' // Override flex for column layout
      };
    }
    
    // Desktop view (above 1024px)
    return {
      ...baseStyles,
      columnCount: 4,
      columnGap: '15px',
      display: 'block' // Override flex for column layout
    };
  };

  // Function to convert name to photo filename format
  const getPhotoFilename = (name) => {
    // Special case for specific doctors with dot in filename
    if (name === "Dr Francesco Zaccardi" || name === "Dr Triyanka Tiu") {
      return name.replace("Dr ", "Dr._").replace(/ /g, '_');
    }
    // For all other names, just replace spaces with underscores
    return name.replace(/ /g, '_');
  };

  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero 
        image="/assets/images/OurPeople.jpg"
        mainText="Our People"
        subText="Our Team consists of world-renowned researchers, clinicians, and industry experts from the three core institutions as well as our external partners. Learn more about our team's expertise and ongoing projects."
        height={windowWidth <= 768 ? '400px' : '600px'}
      />

      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '50px 0' 
        }}>
          <p>Loading data...</p>
        </div>
      ) : leadershipData && peopleData && (
        <div className="leadership-section" style={{ 
          padding: windowWidth <= 768 
            ? '0 var(--spacing-md) var(--spacing-lg)' 
            : '0 var(--spacing-lg) var(--spacing-xl)' 
        }}>
          {/* Co-Directors Section */}
          <section style={{ 
            ...getSectionSpacing(),
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            paddingBottom: windowWidth <= 768 ? '60px' : '80px'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              fontFamily: 'var(--font-primary)',
              fontSize: windowWidth <= 768 ? 'var(--font-size-2xl)' : 'var(--font-size-3xl)',
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text-dark)',
              padding: '0 15px'
            }}>
              Co-Directors
            </h2>
            
            <div style={{ 
              width: '80px', 
              height: '4px', 
              backgroundColor: 'var(--color-primary)', 
              margin: '0 auto 30px' 
            }}></div>
            
            <QuotedTagline text={leadershipData.co_directors.tagline} />
            
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '40px auto',
              width: '100%',
              maxWidth: '1200px',
              padding: windowWidth <= 768 ? '0 15px' : '0'
            }}>
              {leadershipData.co_directors.people.map((person, index) => (
                <LeadershipCard 
                  key={index}
                  name={person.name}
                  title={person.title}
                  bio={person.bio}
                  photo={person.photo}
                  size="large"
                  showBio={false}
                  layout={windowWidth <= 768 ? 'vertical' : 'horizontal'}
                  isEven={index % 2 === 1}
                />
              ))}
            </div>
          </section>
          
          {/* Executive Group Section */}
          <section style={{ 
            ...getSectionSpacing(),
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            paddingBottom: windowWidth <= 768 ? '60px' : '80px'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              fontFamily: 'var(--font-primary)',
              fontSize: windowWidth <= 768 ? 'var(--font-size-2xl)' : 'var(--font-size-3xl)',
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text-dark)',
              padding: '0 15px'
            }}>
              Executive Group
            </h2>
            
            <div style={{ 
              width: '80px', 
              height: '4px', 
              backgroundColor: 'var(--color-primary)', 
              margin: '0 auto 30px' 
            }}></div>
            
            <QuotedTagline text={leadershipData.executive_group.tagline} />
            
            <div style={getGridStyles('medium')}>
              {leadershipData.executive_group.people.map((person, index) => (
                <LeadershipCard 
                  key={index}
                  name={person.name}
                  title={person.title}
                  bio={person.bio}
                  photo={person.photo}
                  size="medium"
                  showBio={true}
                />
              ))}
            </div>
          </section>
          
          {/* Joint Oversight Group Section */}
          <section style={{ 
            ...getSectionSpacing(),
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            paddingBottom: windowWidth <= 768 ? '60px' : '80px'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              fontFamily: 'var(--font-primary)',
              fontSize: windowWidth <= 768 ? 'var(--font-size-2xl)' : 'var(--font-size-3xl)',
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text-dark)',
              padding: '0 15px'
            }}>
              Joint Oversight Group
            </h2>
            
            <div style={{ 
              width: '80px', 
              height: '4px', 
              backgroundColor: 'var(--color-primary)', 
              margin: '0 auto 30px' 
            }}></div>
            
            <QuotedTagline text={leadershipData.joint_oversight_group.tagline} />
            
            <div style={getGridStyles('medium')}>
              {leadershipData.joint_oversight_group.people.map((person, index) => (
                <LeadershipCard 
                  key={index}
                  name={person.name}
                  title={person.title}
                  bio={person.bio}
                  photo={person.photo}
                  size="medium"
                  showBio={true}
                />
              ))}
            </div>
          </section>
          
          {/* The Team Section */}
          <section style={{ 
            ...getSectionSpacing(),
            marginBottom: 0
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              fontFamily: 'var(--font-primary)',
              fontSize: windowWidth <= 768 ? 'var(--font-size-2xl)' : 'var(--font-size-3xl)',
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text-dark)',
              padding: '0 15px'
            }}>
              The Team
            </h2>
            
            <div style={{ 
              width: '80px', 
              height: '4px', 
              backgroundColor: 'var(--color-primary)', 
              margin: '0 auto 30px' 
            }}></div>
            
            <p style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 30px',
              padding: '0 15px',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-md)',
              color: 'var(--color-text)',
              lineHeight: '1.6'
            }}>
              Our diverse team of experts brings together a wealth of knowledge and experience in healthcare, technology, and research.
            </p>
            
            <div style={getTeamCollageStyles()}>
              {peopleData.people.map((person, index) => (
                <TeamCard 
                  key={index}
                  name={person.name}
                  position={person.position}
                  bio={person.bio}
                  photoName={getPhotoFilename(person.name)}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </motion.div>
  );
};

export default OurPeople; 