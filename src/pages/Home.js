import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Video from '../components/Video';
import BlurUpImage from '../components/BlurUpImage';

// Responsive styles for news cards
const newsCardStyle = {
  display: 'flex', 
  flexDirection: 'row',
  marginBottom: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
};

const newsCardVideoStyle = {
  flex: '0 0 40%'
};

const newsCardContentStyle = {
  flex: '0 0 60%', 
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
};

// Media query styles using inline conditional styles
const getResponsiveStyles = () => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  return {
    newsCard: {
      ...newsCardStyle,
      flexDirection: isMobile ? 'column' : 'row'
    },
    newsCardVideo: {
      ...newsCardVideoStyle,
      flex: isMobile ? '0 0 100%' : isTablet ? '0 0 45%' : '0 0 40%'
    },
    newsCardContent: {
      ...newsCardContentStyle,
      flex: isMobile ? '0 0 100%' : isTablet ? '0 0 55%' : '0 0 60%',
      padding: isMobile ? '1.25rem' : '1.5rem'
    },
    sectionTitle: {
      textAlign: 'left',
      marginBottom: '1rem',
      fontSize: isMobile ? 'var(--font-size-2xl, 2rem)' : 'var(--font-size-3xl, 2.5rem)',
      fontWeight: '700',
      color: '#000'
    },
    divider: {
      width: '100%',
      height: '2px',
      backgroundColor: '#000',
      opacity: 0.15,
      margin: '0 0 3rem 0'
    }
  };
};

const Home = () => {
  const [responsiveStyles, setResponsiveStyles] = React.useState(getResponsiveStyles());

  // Update styles on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setResponsiveStyles(getResponsiveStyles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="page page-with-hero">
      <Hero 
        image="/assets/images/HomePageBanner.webp"
        mainText="Centre for Digital Health and Precision Medicine"
        subText="Transforming the future of healthcare through data and AI driven technology"
        height="600px"
      />
      
      {/* Vision Section */}
      <div className="vision-section">
        <div className="container">
          <div className="vision-content">
            <div className="vision-text">
              <h2 className="vision-title" style={{ color: 'black', textAlign: 'left', marginLeft: 0, maxWidth: 'none' }}>A future where healthcare is highly personalized and data-driven</h2>
              <p>
                Our vision is to shape a future where healthcare is deeply personalized, addressing the unique needs of every individual. Through a strategic partnership between the University of Leicester, Apollo Hospitals and The Apollo University, we are pioneering accessible, effective, and patient-centric care. By harnessing advanced data analytics, artificial intelligence, and cutting-edge medical technologies, we aim to revolutionize disease prediction and prevention, drive earlier and more accurate diagnoses, and deliver seamless, coordinated care. Our mission is to enhance patient experiences and outcomes, transforming healthcare into a model of precision, efficiency, with impact on a global scale.
              </p>
              <div className="text-center text-md-left">
                <Link to="/about" className="btn mt-4" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)' }}>Know More About Us</Link>
              </div>
            </div>
            <div className="vision-image">
              <img
                src="/assets/images/HomeAboutSection.jpeg" 
                alt="Digital Health and Precision Medicine"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="latest-news-section" style={{ 
        padding: '4rem 0', 
        backgroundColor: '#f8f9fa'
      }}>
        <div className="container">
          <h2 style={responsiveStyles.sectionTitle}>
            Our Mission
          </h2>
          <div style={responsiveStyles.divider}></div>
          
          {/* News Cards */}
          <div className="news-cards">
            {/* First Card */}
            <div className="news-card" style={responsiveStyles.newsCard}>
              <div className="news-card-video" style={responsiveStyles.newsCardVideo}>
                <Video 
                  thumbnailUrl="/assets/images/HomePageNew1.webp"
                  title="Prof Sir Nilesh Samani"
                  youtubeUrl="https://www.youtube.com/watch?v=FEOIeBVOnaE"
                />
              </div>
              <div className="news-card-content" style={responsiveStyles.newsCardContent}>
                <h3 style={{ 
                  fontSize: 'var(--font-size-xl, 1.5rem)',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#000',
                  textAlign: 'left'
                }}>
                  Creating efficient and holistic solutions for healthcare delivery...
                </h3>
                <p style={{ 
                  fontSize: 'var(--font-size-md, 1rem)',
                  lineHeight: '1.6',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  Providing efficient and holistic solutions to enhance healthcare delivery, ensuring seamless patient care, improved accessibility, and innovative approaches for a healthier future.
                </p>
              </div>
            </div>
            
            {/* Second Card */}
            <div className="news-card" style={responsiveStyles.newsCard}>
              <div className="news-card-video" style={responsiveStyles.newsCardVideo}>
                <Video 
                  thumbnailUrl="/assets/images/HomePageNews2.webp"
                  title="Dr Sujoy Karat"
                  youtubeUrl="https://www.youtube.com/watch?v=3d1Xrh89LGI"
                />
              </div>
              <div className="news-card-content" style={responsiveStyles.newsCardContent}>
                <h3 style={{ 
                  fontSize: 'var(--font-size-xl, 1.5rem)',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#000',
                  textAlign: 'left'
                }}>
                  CDHPM: Advancing Clinical AI and Precision Medicine Through Data-Driven Insights
                </h3>
                <p style={{ 
                  fontSize: 'var(--font-size-md, 1rem)',
                  lineHeight: '1.6',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  CDHPM brings together Apollo Hospitals, The Apollo University, and the University of Leicester to develop and validate clinical AI for precision medicine, ensuring global impact and usability.
                </p>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default Home; 