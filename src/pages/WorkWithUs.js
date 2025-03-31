import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import '../styles/WorkWithUs.css';

const WorkWithUs = () => {
  const [formData, setFormData] = useState({
    principalInvestigators: '',
    principalInvestigatorsEmail: '',
    teamMembers: '',
    projectTitle: '',
    projectDescription: '',
    dataRequired: '',
    anticipatedOutcome: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server
    // For now, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your concept proposal. The CDHPM Executive will review your submission and get in touch with you about next steps.'
    });
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

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      className="page page-with-hero"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Hero Section */}
      <Hero 
        image="/assets/images/Work_with_us.webp"
        mainText="Work With Us"
        subText="Partner with CDHPM on innovative healthcare projects"
        height="500px"
        overlayColor="rgba(0, 0, 0, 0.5)"
      />

      {/* Project Inquiry Section */}
      <section className="section project-inquiry-section">
        <div className="container">
          <div className="project-inquiry-content">
            <div className="left-content">
              <div className="inquiry-info">
                <h2 className="section-title text-left">Collaborate With CDHPM</h2>
                <p className="inquiry-text">
                  The Centre for Digital Health and Precision Medicine (CDHPM) is dedicated to advancing healthcare 
                  through innovative research and technology. We welcome collaboration opportunities with researchers, 
                  healthcare providers, Academic Institutions and industry partners.
                </p>
                <div className="inquiry-benefits">
                  <h3 className="benefits-title">Benefits of Collaboration</h3>
                  <ul className="benefits-list">
                    <li>Pending...</li>
                  </ul>
                </div>
              </div>
              <p className="inquiry-text">
                If you would like to discuss your potential collaboration before completing this form, then please contact one of the individuals below
              </p>
              <div className="contact-section">
                <h3 className="contact-title">Contact Information</h3>
                <div className="contact-list">
                  <div className="contact-item">
                    <span className="contact-name">Professor Sir Nilesh Samani</span>
                    <a href="mailto:njs@le.ac.uk" className="contact-email">njs@le.ac.uk</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-name">Dr. Sujoy Kar</span>
                    <a href="mailto:example@example.com" className="contact-email">example@example.com</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-name">Dr. Lokesh Ravi</span>
                    <a href="mailto:example@exaple.com" className="contact-email">example@exaple.com</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-name">Mr. Jamie Sharp</span>
                    <a href="mailto:example@exaple.com" className="contact-email">example@exaple.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="inquiry-form-container">
              <h2 className="form-title">Concept Proposal</h2>
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
              <form className="inquiry-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="principalInvestigators">Names of Principal Investigator(s)</label>
                  <input
                    type="text"
                    id="principalInvestigators"
                    name="principalInvestigators"
                    value={formData.principalInvestigators}
                    onChange={handleChange}
                    placeholder="E.g: Dr. Nilesh Samani; Dr. Sujoy Kar; etc."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="principalInvestigatorsEmail">Email ID of Principal Investigator(s)</label>
                  <input
                    type="text"
                    id="principalInvestigatorsEmail"
                    name="principalInvestigatorsEmail"
                    value={formData.principalInvestigatorsEmail}
                    onChange={handleChange}
                    placeholder="E.g: principal_investigator@example.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="teamMembers">Other Team Members, Stakeholders & Collaborators</label>
                  <input
                    type="text"
                    id="teamMembers"
                    name="teamMembers"
                    value={formData.teamMembers}
                    onChange={handleChange}
                    placeholder="E.g: Dr. Nilesh Samani; Dr. Sujoy Kar; etc."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="projectTitle">Title of the Project</label>
                  <input
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    placeholder="E.g: Development of Machine Learning Model for Glioblastoma Prediction & Scoring"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="projectDescription">Project Description (500 words)</label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    rows="8"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Describe the project with its key concepts, focusing on the uniqueness, novelty and demand for the proposed project."
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="dataRequired">Types of Data Required</label>
                  <textarea
                    id="dataRequired"
                    name="dataRequired"
                    rows="3"
                    value={formData.dataRequired}
                    onChange={handleChange}
                    placeholder="E.g: Skull X-Rays of Glioblastoma; MRI of Glioblastoma"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="anticipatedOutcome">Anticipated Outcome</label>
                  <textarea
                    id="anticipatedOutcome"
                    name="anticipatedOutcome"
                    rows="3"
                    value={formData.anticipatedOutcome}
                    onChange={handleChange}
                    placeholder="E.g: ML Model for Glioblastoma Prediction, etc."
                    required
                  ></textarea>
                </div>
                
              <p className="form-footer"> <i>Following this submission, the CDHPM Executive will consider the Concept Form and get in touch with you about next steps.</i></p>
                <button type="submit" className="btn btn-primary">Submit Concept Proposal</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default WorkWithUs; 