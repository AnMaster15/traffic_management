import React, { useState } from 'react';
import '../styles/ComplaintForm.css';

const ComplaintForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    category: 'congestion',
    contactEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    
    try {
      await onSubmit(formData);
      setFormData({
        location: '',
        description: '',
        category: 'congestion',
        contactEmail: ''
      });
      setSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="complaint-form-container">
      <h2 className="section-title">Report Traffic Issue</h2>
      
      {success && (
        <div className="success-message">
          Your complaint has been submitted successfully! Reference #: {Math.floor(Math.random() * 1000000)}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location*</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Intersection or street name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Issue Type*</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="congestion">Traffic Congestion</option>
            <option value="accident">Accident</option>
            <option value="signal">Malfunctioning Signal</option>
            <option value="road">Road Damage</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Please describe the issue in detail..."
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email (optional)</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="For follow-up updates"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
      
      <div className="alternative-options">
        <p>Or submit via:</p>
        <ul>
          <li>
            <strong>Mobile App:</strong> 
            <a href="https://traffic.app/complaints" target="_blank" rel="noopener noreferrer">
              Download our app
            </a>
          </li>
          <li>
            <strong>Phone:</strong> 1800-TRAFFIC
          </li>
          <li>
            <strong>Twitter:</strong> @CityTrafficHelp
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ComplaintForm;