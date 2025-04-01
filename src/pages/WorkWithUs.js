import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import '../styles/WorkWithUs.css';

const WorkWithUs = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFacultySelection, setShowFacultySelection] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    collaborationType: '',
    collaborationDescription: '',
    selectedFaculty: []
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  useEffect(() => {
    // Fetch the faculty data from people.json
    fetch('/assets/People/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch faculty data');
        }
        return response.json();
      })
      .then(data => {
        // Find the "faculty" section and map the people data to the format we need
        const facultySection = data.sections.find(section => section.id === 'faculty');
        if (facultySection && facultySection.people) {
          const mappedFaculty = facultySection.people.map((person, index) => ({
            id: index + 1,
            name: person.name,
            position: person.position,
            photo: person.photo,
            email: `example@example.com` // Using placeholder email as actual emails aren't provided in the JSON
          }));
          setFacultyMembers(mappedFaculty);
        } else {
          console.error('Faculty section not found in people.json');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching faculty data:', error);
        // Fallback to default faculty members in case of error
        setFacultyMembers([
          { id: 1, name: "Professor Sir Nilesh Samani", email: "njs@le.ac.uk" },
          { id: 2, name: "Dr. Sujoy Kar", email: "example@example.com" },
          { id: 3, name: "Dr. Lokesh Ravi", email: "example@example.com" },
          { id: 4, name: "Mr. Jamie Sharp", email: "example@example.com" }
        ]);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFacultySelection = (id) => {
    setFormData(prevState => {
      const selectedFaculty = [...prevState.selectedFaculty];
      
      if (selectedFaculty.includes(id)) {
        // Remove faculty if already selected
        return {
          ...prevState,
          selectedFaculty: selectedFaculty.filter(faculty => faculty !== id)
        };
      } else {
        // Add faculty if not selected
        return {
          ...prevState,
          selectedFaculty: [...selectedFaculty, id]
        };
      }
    });
  };

  const toggleFacultySelection = () => {
    setShowFacultySelection(!showFacultySelection);
  };

  const getSelectedFacultyNames = () => {
    return formData.selectedFaculty
      .map(id => facultyMembers.find(faculty => faculty.id === id)?.name)
      .filter(Boolean); // Filter out any undefined values
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server
    // For now, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your collaboration request. The CDHPM Executive will review your submission and get in touch with you shortly.'
    });
    // Reset form after submission
    setFormData({
      name: '',
      institution: '',
      email: '',
      collaborationType: '',
      collaborationDescription: '',
      selectedFaculty: []
    });
    setShowFacultySelection(false);
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

  // Contacts for the contact section (directors and executive group)
  const contactMembers = [
    { id: 1, name: "Professor Sir Nilesh Samani", email: "njs@le.ac.uk" },
    { id: 2, name: "Dr. Sujoy Kar", email: "example@example.com" },
    { id: 3, name: "Dr. Lokesh Ravi", email: "example@example.com" },
    { id: 4, name: "Mr. Jamie Sharp", email: "example@example.com" }
  ];

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
                  {contactMembers.map(contact => (
                    <div key={contact.id} className="contact-item">
                      <span className="contact-name">{contact.name}</span>
                      <a href={`mailto:${contact.email}`} className="contact-email">{contact.email}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="inquiry-form-container">
              <h2 className="form-title">Collaboration Request</h2>
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
              <form className="inquiry-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="institution">Institution</label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Your university, hospital, or organization"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="collaborationType">Nature of Collaboration</label>
                  <input
                    type="text"
                    id="collaborationType"
                    name="collaborationType"
                    value={formData.collaborationType}
                    onChange={handleChange}
                    placeholder="E.g., Research, Clinical Trial, Academic, Industry Partnership"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="collaborationDescription">Description of Collaboration</label>
                  <textarea
                    id="collaborationDescription"
                    name="collaborationDescription"
                    rows="6"
                    value={formData.collaborationDescription}
                    onChange={handleChange}
                    placeholder="Please describe your proposed collaboration, including goals, timeline, and desired outcomes."
                    required
                  ></textarea>
                </div>
                
                <div className="form-group faculty-selection-container">
                  <label className="optional-label">Faculty Members (Optional)</label>
                  
                  {formData.selectedFaculty.length > 0 && (
                    <div className="selected-faculty">
                      <p className="selected-faculty-heading">Working with:</p>
                      <ul className="selected-faculty-list">
                        {getSelectedFacultyNames().map((name, index) => (
                          <li key={index}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <button 
                    type="button" 
                    className="toggle-faculty-btn"
                    onClick={toggleFacultySelection}
                  >
                    {showFacultySelection ? "Hide faculty list" : "Browse faculty members"}
                  </button>
                  
                  {showFacultySelection && (
                    loading ? (
                      <p>Loading faculty members...</p>
                    ) : (
                      <div className="faculty-options">
                        {facultyMembers.map(faculty => (
                          <div key={faculty.id} className="faculty-option">
                            <input
                              type="checkbox"
                              id={`faculty-${faculty.id}`}
                              checked={formData.selectedFaculty.includes(faculty.id)}
                              onChange={() => handleFacultySelection(faculty.id)}
                            />
                            <label htmlFor={`faculty-${faculty.id}`}>{faculty.name}</label>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
                
                <p className="form-footer"><i>Following this submission, the CDHPM Executive will consider your collaboration request and get in touch with you about next steps.</i></p>
                <button type="submit" className="btn btn-primary">Submit Collaboration Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default WorkWithUs; 