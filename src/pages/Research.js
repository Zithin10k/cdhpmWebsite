import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import '../styles/Research.css';
// Import icons
import { FiSend, FiUserPlus, FiMail, FiUsers, FiFileText, FiClipboard, FiDatabase, FiTarget, FiArrowRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineHeart, HiOutlineLightningBolt, HiOutlineUserGroup } from 'react-icons/hi';

const Research = () => {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [activeInView, setActiveInView] = useState(0);
  const topicsContainerRef = useRef(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [formData, setFormData] = useState({
    principalInvestigators: '',
    principalInvestigatorsEmail: '',
    teamMembers: '',
    projectTitle: '',
    projectDescription: '',
    dataRequired: '',
    anticipatedOutcome: ''
  });
  
  const topics = [
    {
      title: "Cardiovascular Diseases and Care",
      image: "/assets/images/Cardiovascular.jpeg",
      icon: <HiOutlineHeart className="research-topic-icon" />,
      description: "Cardiovascular diseases are the leading cause of premature death and morbidity worldwide, including in India. Digital health and precision medicine offer transformative opportunities across every stage of the cardiovascular disease spectrum from prevention and early diagnosis to treatment,management, recovery and rehabilitation"
    },
    {
      title: "Acute and Emergency Medicine",
      image: "/assets/images/Acute.jpeg",
      icon: <HiOutlineLightningBolt className="research-topic-icon" />,
      description: "Acute and Emergency Medicine is a resource – intensive area in any healthcare system, where AI and digital health can significantly enhance care by improving triaging, enabling accurate diagnoses, and initiating timely, efficient and effective treatments."
    },
    {
      title: "Multi-Morbidity",
      image: "/assets/images/multimorbidity.jpeg",
      icon: <HiOutlineUserGroup className="research-topic-icon" />,
      description: "With an ageing population, many individuals live with multi-morbid conditions, often managed in clinical silos, leading to inefficiencies and potential harm. AI-driven solutions offer a transformative opportunity to streamline care, enabling a more coordinated and holistic approach to managing complex patient needs effectively and safely."
    }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
    alert('Your concept proposal has been submitted successfully!');
    // Reset form after submission
    setFormData({
      principalInvestigators: '',
      principalInvestigatorsEmail: '',
      teamMembers: '',
      projectTitle: '',
      projectDescription: '',
      dataRequired: '',
      anticipatedOutcome: ''
    });
  };

  useEffect(() => {
    // Run a check after component is fully mounted to see which topic is in view
    checkVisibleTopic();
    
    // This ensures the initial state is set correctly
    const timer = setTimeout(() => {
      checkVisibleTopic();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check which topic is in view based on scroll position
  const checkVisibleTopic = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    const topicElements = document.querySelectorAll('.topic-content');
    
    if (topicElements.length === 0) return;
    
    // Find the topic that is currently in view
    for (let i = 0; i < topicElements.length; i++) {
      const element = topicElements[i];
      if (!element) continue;
      
      const rect = element.getBoundingClientRect();
      const topOffset = rect.top + window.scrollY;
      const bottomOffset = topOffset + rect.height;
      
      if (scrollPosition >= topOffset && scrollPosition <= bottomOffset) {
        setActiveInView(i);
        break;
      }
    }
  };
  
  // Set up intersection observer
  useEffect(() => {
    const topicElements = document.querySelectorAll('.topic-content');
    
    if (topicElements.length === 0) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -40% 0px',
      threshold: [0.1, 0.5],
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setActiveInView(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Set data attributes and observe each topic element
    topicElements.forEach((element, index) => {
      element.dataset.index = index;
      observer.observe(element);
    });

    return () => {
      topicElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Scroll event listener for continuous tracking
  useEffect(() => {
    window.addEventListener('scroll', checkVisibleTopic);
    return () => window.removeEventListener('scroll', checkVisibleTopic);
  }, []);

  // Scroll to topic when clicked - using Element ID rather than ref
  const scrollToTopic = (index) => {
    setSelectedTopic(index);
    setActiveInView(index);
    
    // Use direct DOM access which is more reliable than refs on first render
    const targetElement = document.getElementById(`topic-${index}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div 
      className="page page-with-hero research-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'left' }}
    >
      <Hero 
        image="/assets/images/Research.webp"
        mainText="Research Initiatives"
        subText="Exploring innovative approaches to digital health and precision medicine to transform healthcare"
        height="60vh"
        overlayColor="rgba(0, 0, 0, 0.5)"
        textPosition="left"
      />
      
      <div className="research-page-content">
        <div className="container">
          <motion.div 
            className="research-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-header">
              <h2 className="section-title">Our Research Focus</h2>
            </div>
            
            <div className="research-intro">
              <div className="intro-content">
                <p>The Centre for Digital Health and Precision Medicine aims to leverage the extensive longitudinal patient database of the Apollo Hospitals Group, and datasets of the University of Leicester and other Consortium Partners to deliver improved population health with a global perspective through better disease prediction and prevention.</p>
                <p>Our work is dedicated to making a tangible difference in patient lives and healthcare systems worldwide, leading to improved and earlier detection, diagnosis and management of multiple acute and long-term conditions in hospital and community settings.</p>
              </div>
              <div className="intro-decoration">
                <div className="decoration-circle"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
            
            {/* Topics Showcase - Grid layout for better organization */}
            <div className="topics-showcase">
              <div className="topics-grid">
                {topics.map((topic, index) => (
                  <motion.div 
                    key={index}
                    id={`topic-${index}`}
                    className="topic-content"
                    data-index={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="topic-card">
                      <div className="topic-image-container">
                        <div className="topic-number">{(index + 1).toString().padStart(2, '0')}</div>
                        <img 
                          src={topic.image} 
                          alt={topic.title}
                          className="topic-image"
                        />
                        <div className="topic-image-overlay"></div>
                      </div>
                      <div className="topic-text-content">
                        <div className="topic-header">
                          <div className="topic-icon-container">
                            {topic.icon}
                          </div>
                          <h3 className="topic-title">{topic.title}</h3>
                          <div className="topic-category">Research Focus Area</div>
                        </div>
                        <p className="topic-description">{topic.description}</p>
                        <motion.button 
                          className="topic-learn-more"
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>READ MORE</span>
                          <FiArrowRight className="arrow-icon" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="concept-proposal-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="concept-form-wrapper">
              {/* Abstract Art Container */}
              <div className="abstract-art-container">
                <div className="abstract-shape abstract-shape-1"></div>
                <div className="abstract-shape abstract-shape-2"></div>
                <div className="abstract-shape abstract-shape-3"></div>
                <div className="abstract-shape abstract-shape-4"></div>
                <div className="abstract-line abstract-line-1"></div>
                <div className="abstract-line abstract-line-2"></div>
                <div className="abstract-circle abstract-circle-1"></div>
                <div className="abstract-circle abstract-circle-2"></div>
              </div>
              
              <div className="concept-form-title-container">
                <h2 className="concept-form-main-title">Concept Proposal Form</h2>
                <p className="concept-form-subtitle">Submit your research concept proposal for consideration by our team.</p>
              </div>
              
              {/* Toggle Button for Expanding/Collapsing Form */}
              <motion.button 
                className="form-toggle-button"
                onClick={() => setIsFormExpanded(!isFormExpanded)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={isFormExpanded}
              >
                <span>{isFormExpanded ? "Hide Form" : "Open Proposal Form"}</span>
                <motion.div
                  initial={false}
                  animate={{ rotate: isFormExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="toggle-icon" />
                </motion.div>
              </motion.button>
              
              {/* Collapsible Form */}
              <AnimatePresence>
                {isFormExpanded && (
                  <motion.div 
                    className="form-container"
                    initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                    animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <form className="concept-proposal-form" onSubmit={handleSubmit}>                  
                      <div className="form-flex-row">
                        <div className="form-group">
                          <label htmlFor="principalInvestigators">
                            <FiUserPlus className="form-icon" />
                            <span>Principal Investigator(s)</span>
                          </label>
                          <input
                            type="text"
                            id="principalInvestigators"
                            name="principalInvestigators"
                            value={formData.principalInvestigators}
                            onChange={handleChange}
                            placeholder="E.g: Dr. Nilesh Samani; Dr. Sujoy Kar"
                            required
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="principalInvestigatorsEmail">
                            <FiMail className="form-icon" />
                            <span>Email ID</span>
                          </label>
                          <input
                            type="email"
                            id="principalInvestigatorsEmail"
                            name="principalInvestigatorsEmail"
                            value={formData.principalInvestigatorsEmail}
                            onChange={handleChange}
                            placeholder="principal_investigator@example.com"
                            required
                            className="form-input"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="teamMembers">
                          <FiUsers className="form-icon" />
                          <span>Team Members, Stakeholders & Collaborators</span>
                        </label>
                        <input
                          type="text"
                          id="teamMembers"
                          name="teamMembers"
                          value={formData.teamMembers}
                          onChange={handleChange}
                          placeholder="List all team members involved in the project"
                          required
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="projectTitle">
                          <FiFileText className="form-icon" />
                          <span>Project Title</span>
                        </label>
                        <input
                          type="text"
                          id="projectTitle"
                          name="projectTitle"
                          value={formData.projectTitle}
                          onChange={handleChange}
                          placeholder="E.g: Development of Machine Learning Model for Glioblastoma Prediction"
                          required
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="projectDescription">
                          <FiClipboard className="form-icon" />
                          <span>Project Description (500 words)</span>
                        </label>
                        <textarea
                          id="projectDescription"
                          name="projectDescription"
                          rows="6"
                          value={formData.projectDescription}
                          onChange={handleChange}
                          placeholder="Describe the project with its key concepts, focusing on uniqueness, novelty and demand for the proposed project."
                          required
                          className="form-input form-textarea"
                        ></textarea>
                      </div>
                      
                      <div className="form-flex-row">
                        <div className="form-group">
                          <label htmlFor="dataRequired">
                            <FiDatabase className="form-icon" />
                            <span>Types of Data Required</span>
                          </label>
                          <textarea
                            id="dataRequired"
                            name="dataRequired"
                            rows="3"
                            value={formData.dataRequired}
                            onChange={handleChange}
                            placeholder="E.g: Skull X-Rays of Glioblastoma; MRI of Glioblastoma"
                            required
                            className="form-input form-textarea"
                          ></textarea>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="anticipatedOutcome">
                            <FiTarget className="form-icon" />
                            <span>Anticipated Outcome</span>
                          </label>
                          <textarea
                            id="anticipatedOutcome"
                            name="anticipatedOutcome"
                            rows="3"
                            value={formData.anticipatedOutcome}
                            onChange={handleChange}
                            placeholder="E.g: ML Model for Glioblastoma Prediction"
                            required
                            className="form-input form-textarea"
                          ></textarea>
                        </div>
                      </div>
                      
                      <p className="form-note"><span className="note-highlight">Note:</span> Following this submission, the CDHPM Executive will review your proposal and contact you about next steps.</p>
                      
                      <motion.button 
                        type="submit" 
                        className="submit-button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span>Submit Proposal</span>
                        <FiSend className="button-icon" />
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Research; 