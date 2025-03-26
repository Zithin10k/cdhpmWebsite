import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import PersonCard from '../components/PersonCard';
import QuotedTagline from '../components/QuotedTagline';
import StickyNav from '../components/StickyNav';
import { useLocation, useParams } from 'react-router-dom';

const OurPeople = () => {
  const [peopleData, setPeopleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [activeSection, setActiveSection] = useState(null);
  const [isStickyNavActive, setIsStickyNavActive] = useState(false);
  const location = useLocation();
  const { sectionId } = useParams();

  // Create a ref for each section
  const sectionRefs = useRef({});

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

  // Fetch data
  useEffect(() => {
    fetch('/assets/People/people.json')
      .then(response => response.json())
      .then(data => {
        setPeopleData(data);
        setLoading(false);
        
        // Initialize section refs
        if (data && data.sections) {
          data.sections.forEach(section => {
            if (!sectionRefs.current[section.id]) {
              sectionRefs.current[section.id] = React.createRef();
            }
          });
        }
        
        // Set initial active section
        if (!activeSection && data && data.sections && data.sections.length > 0) {
          setActiveSection(data.sections[0].id);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Intersection Observer to track which section is in view
  useEffect(() => {
    if (loading || !peopleData || !peopleData.sections) return;

    const options = {
      root: null,
      rootMargin: '-100px 0px -70% 0px', // Adjust as needed
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Find the section ID from the entry target's ID
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    }, options);

    // Observe each section
    peopleData.sections.forEach(section => {
      const ref = sectionRefs.current[section.id];
      if (ref && ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      peopleData.sections.forEach(section => {
        const ref = sectionRefs.current[section.id];
        if (ref && ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [loading, peopleData]);

  // Effect to handle initial section from URL
  useEffect(() => {
    if (sectionId && !loading && peopleData) {
      const section = peopleData.sections.find(s => s.id === sectionId);
      if (section && sectionRefs.current[section.id] && sectionRefs.current[section.id].current) {
        // Check if this is a navigation with history state
        const historyState = window.history.state;
        const hasScrollPreservation = historyState && historyState.scrollPreservation;
        
        // Only scroll if this is not an internal navigation with scroll preservation
        if (!hasScrollPreservation) {
          // Get the current position of the element
          const elementRect = sectionRefs.current[section.id].current.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          
          // Calculate offset for sticky header (approximately 60px)
          const scrollOffset = 60;
          
          // Scroll to the element with offset
          window.scrollTo({
            top: absoluteElementTop - scrollOffset,
            behavior: 'smooth'
          });
        }
        
        // Update active section state
        setActiveSection(sectionId);
      }
    }
  }, [sectionId, loading, peopleData]);

  // Handle section click
  const handleSectionClick = (sectionId) => {
    if (sectionRefs.current[sectionId] && sectionRefs.current[sectionId].current) {
      // Get the current position of the element
      const elementRect = sectionRefs.current[sectionId].current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      
      // Calculate offset for sticky header (approximately 60px)
      const scrollOffset = 60;
      
      // Scroll to the element with offset
      window.scrollTo({
        top: absoluteElementTop - scrollOffset,
        behavior: 'smooth'
      });
      
      // Update active section state
      setActiveSection(sectionId);
    }
  };

  // Handle back to top click
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get team collage styles based on screen size
  const getTeamCollageStyles = () => {
    // Base styles for all screen sizes
    const baseStyles = {
      display: 'grid',
      gap: '20px',
      margin: '30px auto',
      maxWidth: '1200px',
      padding: '0 15px'
    };
    
    // Mobile view (up to 768px)
    if (windowWidth <= 768) {
      return {
        ...baseStyles,
        gridTemplateColumns: '1fr',
      };
    }
    
    // Tablet view (768px - 1024px)
    if (windowWidth <= 1024) {
      return {
        ...baseStyles,
        gridTemplateColumns: 'repeat(2, 1fr)',
      };
    }
    
    // Desktop view (above 1024px)
    return {
      ...baseStyles,
      gridTemplateColumns: 'repeat(4, 1fr)',
    };
  };

  // Get grid styles for different card types
  const getGridStyles = (cardType) => {
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
    // For card type 3 (vertical large)
    if (cardType === 3) {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        margin: '40px auto',
        maxWidth: '1200px',
        gap: '30px'
      };
    }
    
    // For card type 1 and 2 (horizontal)
    if (cardType === 1 || cardType === 2) {
      return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '40px auto',
        width: '100%',
        maxWidth: '1200px',
        padding: windowWidth <= 768 ? '0 15px' : '0'
      };
    }
    
    // Default desktop view for card type 4 (small vertical)
    return {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: '40px auto',
      maxWidth: '1200px',
      gap: '20px'
    };
  };

  // Section spacing based on screen size
  const getSectionSpacing = () => {
    return windowWidth <= 768 
      ? { marginBottom: '80px', paddingTop: '40px' } 
      : { marginBottom: '120px', paddingTop: '50px' };
  };

  return (
    <div className="page">
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '50px 0' 
        }}>
          <p>Loading data...</p>
        </div>
      ) : peopleData && (
        <>
          <Hero 
            image="/assets/images/OurPeopleBanner.jpeg"
            mainText={peopleData.pageTitle}
            subText={peopleData.pageDescription}
            height={windowWidth <= 768 ? '400px' : '600px'}
          />

          {/* Sticky Navigation Bar */}
          <StickyNav 
            sections={peopleData.sections.map(section => ({
              id: section.id,
              name: section.title,
              ref: sectionRefs.current[section.id]
            }))}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
            isMobile={windowWidth <= 768}
            onStickyChange={setIsStickyNavActive}
          />

          {/* Back to Top Button */}
          {isStickyNavActive && (
            <button
              onClick={handleBackToTop}
              style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                transition: 'all 0.3s ease',
                opacity: 0.8,
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-base)',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
            >
              <span>Back to Top</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: 'rotate(-90deg)'
                }}
              >
                <path 
                  d="M9 5L16 12L9 19" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div className="people-sections" style={{ 
            padding: windowWidth <= 768 
              ? '0 var(--spacing-md) var(--spacing-lg)' 
              : '0 var(--spacing-lg) var(--spacing-xl)' 
          }}>
            {peopleData.sections.map((section, sectionIndex) => {
              // Determine the dominant card type in this section
              const dominantCardType = section.people.length > 0 
                ? section.people[0].cardType 
                : 4;

              return (
                <section 
                  key={section.id}
                  id={section.id} 
                  ref={sectionRefs.current[section.id]}
                  style={{ 
                    ...getSectionSpacing(),
                    borderBottom: sectionIndex < peopleData.sections.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                    paddingBottom: windowWidth <= 768 ? '60px' : '80px',
                    scrollMarginTop: '60px' // Adjusted for sticky nav height
                  }}
                >
                  <h2 style={{ 
                    textAlign: 'center', 
                    fontFamily: 'var(--font-primary)',
                    fontSize: windowWidth <= 768 ? 'var(--font-size-2xl)' : 'var(--font-size-3xl)',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-text-dark)',
                    padding: '0 15px'
                  }}>
                    {section.title}
                  </h2>
                  
                  <div style={{ 
                    width: '80px', 
                    height: '4px', 
                    backgroundColor: 'var(--color-primary)', 
                    margin: '0 auto 30px' 
                  }}></div>
                  
                  <QuotedTagline text={section.tagline} />
                  
                  {/* Render cards based on the dominant card type */}
                  {dominantCardType === 4 ? (
                    // For small vertical cards (type 4), use column layout
                    <div style={getTeamCollageStyles()}>
                      {section.people.map((person, index) => (
                        <PersonCard 
                          key={`${section.id}-${index}`}
                          person={person}
                          windowWidth={windowWidth}
                        />
                      ))}
                    </div>
                  ) : (
                    // For other card types, use appropriate grid layout
                    <div style={getGridStyles(dominantCardType)}>
                      {section.people.map((person, index) => (
                        <PersonCard 
                          key={`${section.id}-${index}`}
                          person={person}
                          windowWidth={windowWidth}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default OurPeople; 