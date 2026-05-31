import { useState } from 'react';
import './signup.css';

export default function Signup({ setAuth, onBack, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match!');
      return;
    }

    console.log('Signup Attempt:', formData);
    if (setAuth) setAuth(true);
  };

  return (
    <div className="signup-page">
      <div className="signup-bg-overlay"></div>
      <div className="signup-container">
        <button className="signup-back-btn" onClick={onBack}>← Back to Home</button>
        
        <div className="signup-card">
          <div className="signup-header">
            <span className="signup-logo-icon">⚔️</span>
            <h2>Create Your Account</h2>
            <p>Join the ultimate chess community today.</p>
          </div>

          {error && <div className="signup-error">{error}</div>}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-group">
              <label>Username</label>
              <div className="signup-input-wrapper">
                <span className="signup-icon">👤</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-form-group">
              <label>Email Address</label>
              <div className="signup-input-wrapper">
                <span className="signup-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-form-group">
              <label>Password</label>
              <div className="signup-input-wrapper">
                <span className="signup-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-form-group">
              <label>Confirm Password</label>
              <div className="signup-input-wrapper">
                <span className="signup-icon">🛡️</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="signup-submit-btn">Register Now ⚔️</button>
          </form>

          <div className="signup-toggle">
            <p>Already have an account? <button onClick={onSwitchToLogin}>Sign In instead</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}