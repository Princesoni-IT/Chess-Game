import { useState } from 'react';
import './login.css';

export default function Login({ setAuth, onBack, onSwitchToSignup }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    console.log('Login Attempt:', formData);
    
    // Fake successful login for now
    if (setAuth) setAuth(true);
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay"></div>
      <div className="login-container">
        <button className="login-back-btn" onClick={onBack}>← Back to Home</button>
        
        <div className="login-card">
          <div className="login-header">
            <span className="login-logo-icon">👑</span>
            <h2>Welcome Back, Grandmaster</h2>
            <p>Enter your details to resume your battles.</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label>Email Address</label>
              <div className="login-input-wrapper">
                <span className="login-icon">✉️</span>
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

            <div className="login-form-group">
              <label>Password</label>
              <div className="login-input-wrapper">
                <span className="login-icon">🔒</span>
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

            <div className="login-forgot-password">
              <a href="#forgot">Forgot Password?</a>
            </div>

            <button type="submit" className="login-submit-btn">Sign In 🚀</button>
          </form>

          <div className="login-toggle">
            <p>New to the game? <button onClick={onSwitchToSignup}>Create an account</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}