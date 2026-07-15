import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const ADMIN_EMAIL = 'admin@jalaacademy.com';
const ADMIN_PASSWORD = 'Admin@123';
const AUTH_KEY = 'jala_admin_auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setMessage('Done. Admin login successful.');
      navigate('/dashboard');
      return;
    }

    setMessage('Use admin@jalaacademy.com / Admin@123');
  };

  return (
    <>
      <SEO
        title="Admin Sign In"
        description="JALA admin sign in page."
      />

      <main className="jala-signin-page">
        <section className="jala-signin-card" aria-label="Admin sign in form">
          <div className="jala-signin-heading">
            <h1>Sign in</h1>
            <p>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="jala-signin-form">
            <label className="jala-signin-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@jalaacademy.com"
                required
              />
            </label>

            <label className="jala-signin-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
              />
            </label>

            <button type="submit" className="jala-signin-submit">
              Sign in
            </button>
          </form>

          {message && <p className="jala-signin-message">{message}</p>}

          <p className="jala-signin-default">
            Default: {ADMIN_EMAIL} / {ADMIN_PASSWORD}
          </p>
        </section>
      </main>
    </>
  );
}


