import React, { useState, useEffect } from 'react';
import { getAllUsers, searchUserByPhone } from './services/api';
import SearchBar from './components/SearchBar';
import './App.css';

export default function App() {
  const [, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
      const details = error.response?.data?.details;
      const errMsg = typeof details === 'string' ? details : 'Error loading user accounts database.';
      showNotification(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = async (phone) => {
    if (!phone) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    try {
      const results = await searchUserByPhone(phone);
      setSearchResults(results);
      setHasSearched(true);
      showNotification(`Search completed: ${results.length} result(s) found.`, 'success');
    } catch (error) {
      console.error('Search query failed:', error);
      const details = error.response?.data?.details;
      const errMsg = typeof details === 'string' ? details : 'Search failed. Please verify connection to the server.';
      showNotification(errMsg, 'error');
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top-row">
          <div className="header-title-section">
            <h1>Accounts Department Portal</h1>
            <p className="subtitle">Confidential Internal Utility & User Registry</p>
          </div>
        </div>
      </header>

      {notification && (
        <div className={`notification notification-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}

      <main className="app-main">
        {loading && <div className="page-loader">Loading Registry Data...</div>}

        <div className="jala-search-page animate-slide-up">
          <div className="jala-card">
            <div className="jala-header">
              <div className="jala-title-row">
                <span className="text-jala">JALA</span>
                <div className="jala-logo-icon">
                  <svg width="34" height="24" viewBox="0 0 34 24" fill="none">
                    <rect x="1" y="14" width="6" height="6" stroke="#c0ff3e" strokeWidth="2" fill="none" />
                    <rect x="23" y="2" width="6" height="6" stroke="#c0ff3e" strokeWidth="2" fill="none" />
                    <path d="M7 17 H17 V5 H23" stroke="#c0ff3e" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <span className="text-connect">Connect</span>
              </div>
              <div className="jala-subtitle">Mentorship and Learning Refined</div>
            </div>

            <SearchBar onSearch={handleSearch} />

            {hasSearched && (
              <div className="jala-results-container">
                <div className="jala-status-banner">
                  STATUS: {searchResults.length > 0 ? searchResults[0].status : 'Unknown'}
                </div>

                {searchResults.length > 0 ? (
                  <table className="jala-details-table">
                    <tbody>
                      <tr>
                        <td className="jala-label">Name</td>
                        <td className="jala-value">{searchResults[0].name}</td>
                      </tr>
                      <tr>
                        <td className="jala-label">Phone</td>
                        <td className="jala-value">{searchResults[0].phone}</td>
                      </tr>
                      <tr>
                        <td className="jala-label">Email</td>
                        <td className="jala-value">{searchResults[0].email}</td>
                      </tr>
                      <tr>
                        <td className="jala-label">Joining Date</td>
                        <td className="jala-value">{searchResults[0].joining_date}</td>
                      </tr>
                      <tr>
                        <td className="jala-label">Inactive On</td>
                        <td className="jala-value">{searchResults[0].inactive_on || '-'}</td>
                      </tr>
                      <tr>
                        <td className="jala-label">Message</td>
                        <td className="jala-value">{searchResults[0].message || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div className="jala-not-found-message">
                    No matching user account found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Accounts Department. Strictly for Internal Use.</p>
      </footer>
    </div>
  );
}
