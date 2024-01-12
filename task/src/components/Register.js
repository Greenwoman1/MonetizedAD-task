import React from 'react';
import './register.css'; // Import the CSS file

const Register = ({ formData, handleInputChange, handleRegistration }) => {
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
        <div className="form-group">
          <button className="form-button" type="button" onClick={handleRegistration}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
