import React, { useState } from 'react';
import SEO from '../components/SEO';

const ADMIN_EMAIL = 'admin@magnus.com';
const ADMIN_PASSWORD = 'Admin@123';

export default function AdminLogin() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setMessage('Done. Admin login successful.');
      return;
    }

    setMessage('Use admin@magnus.com / Admin@123');
  };

  return (
    <>
      <SEO
        title="Admin Sign In"
        description="Magnus admin sign in page."
      />

      <main className="magnus-admin-page">
        <section className="magnus-admin-card" aria-label="Admin sign in form">
          <div className="magnus-admin-heading">
            <h1>Sign in</h1>
            <p>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="magnus-admin-form">
            <label className="magnus-admin-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@magnus.com"
                required
              />
            </label>

            <label className="magnus-admin-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
              />
            </label>

            <button type="submit" className="magnus-admin-submit">
              Sign in
            </button>
          </form>

          {message && <p className="magnus-admin-message">{message}</p>}

          <p className="magnus-admin-default">
            Default: {ADMIN_EMAIL} / {ADMIN_PASSWORD}
          </p>
        </section>
      </main>
    </>
  );
}
