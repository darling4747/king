import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { lookupUser } from '../constants/mockUsers';
import logo from '../assets/jala/logo.png';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [record, setRecord] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanPhone = phone.trim().replace(/\D/g, '');

    if (!/^\d{10,12}$/.test(cleanPhone)) {
      setRecord(null);
      setMessage('Enter 10-12 digit phone number');
      return;
    }

    const foundRecord = lookupUser(cleanPhone);
    setRecord(foundRecord || null);
    setMessage(foundRecord ? '' : 'No record found');
  };

  return (
    <>
      <SEO
        title="JALA Connect"
        description="Search JALA Connect candidate records by phone number."
      />

      <main className="jala-home-page">
        <div className="jala-home-row">
          <div className="jala-home-spacer" />
          <div className="jala-home-column">
            <form className="jala-home-form" method="post" autoComplete="off" onSubmit={handleSubmit}>
              <Link to="/login" aria-label="Open login">
                <img src={logo} alt="JALA Connect" className="jala-home-logo" />
              </Link>

              <div className="jala-home-input-container">
                <input
                  type="text"
                  className="jala-home-input"
                  name="txtreg"
                  placeholder="Enter Phone No."
                  pattern="\d{10,12}"
                  title="Enter 10-12 digit phone number"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>

              <button type="submit" className="jala-home-submit">
                SEARCH HERE
              </button>

              {message && <div className="jala-home-message">{message}</div>}

              {record && (
                <div className="jala-home-result" aria-live="polite">
                  <div className="jala-home-result-row">
                    <span>Name</span>
                    <strong>{record.name}</strong>
                  </div>
                  <div className="jala-home-result-row">
                    <span>Phone</span>
                    <strong>{record.phone}</strong>
                  </div>
                  <div className="jala-home-result-row">
                    <span>Status</span>
                    <strong>{record.status}</strong>
                  </div>
                  <div className="jala-home-result-row">
                    <span>Joined</span>
                    <strong>{record.joining_date}</strong>
                  </div>
                  <p>{record.message}</p>
                </div>
              )}
            </form>
          </div>
          <div className="jala-home-spacer" />
        </div>
      </main>
    </>
  );
}

