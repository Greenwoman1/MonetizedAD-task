import React, { useEffect } from 'react';
import './register.css'; // Import the CSS file
import { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
const Register = ({ formData, handleInputChange, handleRegistration }) => {
  const [errors, setErrors] = useState({});


 
  const validateForm = async() => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = 'Username must be between 3 and 20 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6 || formData.password.length > 20) {
      newErrors.password = 'Password must be between 6 and 20 characters';
    }

    if (!formData.repeatPassword) {
      newErrors.repeatPassword = 'Repeat Password is required';
    } else if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = 'Passwords do not match';
    }

    
    if (formData.yearOfBirth < 1900 && formData.yearOfBirth > 2024) {
      newErrors.subscribeToNewsLetter = 'Year of Birth must be between 1900 and 2024' ;
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;

    await new Promise((resolve) => setTimeout(resolve, 0));
  
    return isValid
  };

  const handleSubmit = async () => {
    if (await validateForm()) {
      handleRegistration();
    }
  };





  return (
    <div className="register-container">
      <h2>Registration Form</h2>
      <form>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Repeat Password:</label>
          <input
            className="form-input"
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Subscribe to Newsletter:
            <input
              className="form-checkbox"
              type="checkbox"
              name="subscribeToNewsLetter"
              checked={formData.subscribeToNewsLetter}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">Gender:</label>
          <div className="form-radio-group">
            <label className="form-checkbox-label">
              Male
              <input
                className="form-radio"
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-checkbox-label">
              Female
              <input
                className="form-radio"
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
            </label><label className="form-checkbox-label">
              Other
              <input
                className="form-radio"
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <div>
          <label>Year of Birth:</label>
          <input
            type="number"
            name="yearOfBirth"
            value={formData.yearOfBirth}
            onChange={handleInputChange}
          />
        </div>


        {errors.username && <div className="error-message">{errors.username}</div>}
        {errors.password && <div className="error-message">{errors.password}</div>}
        {errors.repeatPassword && <div className="error-message">{errors.repeatPassword}</div>}
        {errors.subscribeToNewsLetter && <div className="error-message">{errors.subscribeToNewsLetter}</div>}
        {errors.yearOfBirth && <div className="error-message">{errors.yearOfBirth}</div>}
        
        <div className="form-group">
          <button className="form-button" type="button" onClick={handleSubmit}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
