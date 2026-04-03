import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== password2) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);
    const result = await signup(username, email, password, password2);
    setIsLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }

        .auth-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.25;
          pointer-events: none;
        }
        .auth-bg-orb.amber { background: #f59e0b; width: 350px; height: 350px; top: 10%; right: 15%; }
        .auth-bg-orb.blue  { background: #3b82f6; width: 250px; height: 250px; bottom: 15%; left: 10%; }

        .auth-card {
          position: relative;
          z-index: 1;
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(24px);
          border-radius: 28px;
          border: 1px solid #334155;
          padding: 3rem;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        }

        .auth-card-glow {
          position: absolute;
          inset: -2px;
          border-radius: 30px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), transparent, rgba(59, 130, 246, 0.2));
          z-index: -1;
          filter: blur(1px);
        }

        .auth-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          text-decoration: none;
        }

        .auth-logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 8px 30px rgba(245, 158, 11, 0.35);
        }

        .auth-logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #fcd34d, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .auth-subtitle {
          text-align: center;
          color: #94a3b8;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }

        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }

        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #cbd5e1;
        }

        .form-input {
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1.5px solid #334155;
          background: rgba(15, 23, 42, 0.6);
          color: #fff;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input::placeholder { color: #64748b; }
        .form-input:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.875rem;
          text-align: center;
        }

        .auth-btn {
          padding: 0.9rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #fff;
          box-shadow: 0 8px 30px rgba(245, 158, 11, 0.3);
          margin-top: 0.5rem;
        }

        .auth-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(245, 158, 11, 0.45);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-footer {
          text-align: center;
          margin-top: 1.75rem;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .auth-footer a {
          color: #f59e0b;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .auth-footer a:hover { color: #fcd34d; }

        .auth-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          transition: color 0.2s;
        }
        .auth-back:hover { color: #f59e0b; }

        .password-hint {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 0.25rem;
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-bg-orb amber" />
        <div className="auth-bg-orb blue" />

        <div className="auth-card">
          <div className="auth-card-glow" />

          <Link to="/" className="auth-back">← Back to Home</Link>

          <Link to="/" className="auth-logo">
            <div className="auth-logo-icon">♔</div>
            <span className="auth-logo-text">Chess Master</span>
          </Link>

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join millions of chess players worldwide</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                id="username"
                className="form-input"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="form-input"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <span className="password-hint">Must be at least 8 characters</span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password2">Confirm Password</label>
              <input
                id="password2"
                className="form-input"
                type="password"
                placeholder="Confirm your password"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <button className="auth-btn" type="submit" disabled={isLoading}>
              {isLoading ? '⏳ Creating Account...' : '🚀 Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
