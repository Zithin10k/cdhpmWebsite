import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
      message: 'Thank you for your message. We will get back to you soon!'
    });
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
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
        image="/assets/images/contact_us.jpeg"
        mainText="Contact Us"
        subText="Get in touch with our team"
        height="500px"
        overlayColor="rgba(0, 0, 0, 0.4)"
      />

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-title text-left">Get In Touch</h2>
              <p className="contact-text text-left">
                We'd love to hear from you. Please feel free to reach out to us with any questions, 
                inquiries, or collaboration opportunities.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text text-left">
                    <h3>Email</h3>
                    <p><a href="mailto:contact@cdhpm.com">contact@cdhpm.com</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text text-left">
                    <h3>Address</h3>
                    <p className="address-text">The Apollo University<br />
                    The Apollo Knowledge City Campus, Saketa,<br />
                    Murukambattu, Chittoor-517127. (AP)</p>
                  </div>
                </div>
                
                {/* Google Maps */}
                <div className="contact-map">
                  <h3 className="map-title text-left">Find Us</h3>
                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.1763539211!2d79.11175010000001!3d13.249818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDE0JzU5LjMiTiA3OcKwMDYnNTEuNiJF!5e0!3m2!1sen!2sin!4v1647845200000!5m2!1sen!2sin"
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: '8px', marginTop: '15px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="CDHPM Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <h2 className="form-title text-left">Send Us a Message</h2>
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactUs; 