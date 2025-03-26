import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import '../styles/WorkWithUs.css';

const WorkWithUs = () => {
  const [formData, setFormData] = useState({
    principalInvestigator: '',
    projectTitle: '',
    projectDescription: '',
    scope: '',
    stakeholders: '',
    supportNeeded: ''
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
      message: 'Thank you for your project inquiry. Our team will review your submission and get back to you soon!'
    });
    // Reset form after submission
    setFormData({
      principalInvestigator: '',
      projectTitle: '',
      projectDescription: '',
      scope: '',
      stakeholders: '',
      supportNeeded: ''
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
                Please complete the attached form, to outline the nature of the collaboration you are proposing.
                If you would like to discuss your potential collaboration before completing this form, then please contact one of the individuals below
              </p>
              <div className="contact-section">
                <h3 className="contact-title">Contact Information</h3>
                <div className="contact-list">
                  <div className="contact-item">
                    <span className="contact-name">Dr. Nilesh Samani</span>
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
              <h2 className="form-title">Project Inquiry Form</h2>
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
              <form className="inquiry-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="principalInvestigator">Principal Investigator (PI)</label>
                  <input
                    type="text"
                    id="principalInvestigator"
                    name="principalInvestigator"
                    value={formData.principalInvestigator}
                    onChange={handleChange}
                    placeholder="Enter the name of the Principal Investigator"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="projectTitle">Project Title</label>
                  <input
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    placeholder="Enter the title of your project"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="projectDescription">Project Description</label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    rows="5"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of your project"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="scope">Scope</label>
                  <textarea
                    id="scope"
                    name="scope"
                    rows="3"
                    value={formData.scope}
                    onChange={handleChange}
                    placeholder="Define the scope of your project"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="stakeholders">Stakeholders</label>
                  <textarea
                    id="stakeholders"
                    name="stakeholders"
                    rows="3"
                    value={formData.stakeholders}
                    onChange={handleChange}
                    placeholder="List all stakeholders involved in the project"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="supportNeeded">CDHPM Support Needed</label>
                  <textarea
                    id="supportNeeded"
                    name="supportNeeded"
                    rows="4"
                    value={formData.supportNeeded}
                    onChange={handleChange}
                    placeholder="Describe what support you are expecting from CDHPM"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit Project Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default WorkWithUs; 