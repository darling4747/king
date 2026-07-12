import React, { useState, useEffect } from 'react';
import {
  getAllUsers,
  searchUserByPhone,
  createUser,
  updateUser,
  deleteUser
} from './services/api';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('list'); // 'list' | 'add' | 'search'
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Helper to show auto-dismissing notifications
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Load all users from database
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

  // Search logic (triggered by SearchBar component)
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
      setHasSearched(true); // Still set hasSearched true to show the "Not Found" state
    } finally {
      setLoading(false);
    }
  };

  // Form submission (Adding or Editing a User)
  const handleFormSubmit = async (userData) => {
    setLoading(true);
    try {
      if (selectedUser && selectedUser.id) {
        // Update user
        const updated = await updateUser(selectedUser.id, userData);
        setUsers((prev) =>
          prev.map((user) => (user.id === selectedUser.id ? updated : user))
        );
        // Sync search results if they exist
        setSearchResults((prev) =>
          prev.map((user) => (user.id === selectedUser.id ? updated : user))
        );
        showNotification(`Account for "${updated.name}" successfully updated.`);
      } else {
        // Create user
        const created = await createUser(userData);
        setUsers((prev) => [created, ...prev]);
        showNotification(`Account for "${created.name}" successfully created.`);
      }
      setSelectedUser(null);
      setCurrentPage('list'); // Return to registry page after form submission
    } catch (error) {
      console.error('Form submission failed:', error);
      const details = error.response?.data?.details;
      const errMsg =
        Array.isArray(details) ? details.join(' ') :
        typeof details === 'string' ? details :
        error.response?.data?.error ||
        'Failed to process form request.';
      showNotification(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this user account?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setSearchResults((prev) => prev.filter((user) => user.id !== id));
      showNotification('User account deleted successfully.');
      if (selectedUser && selectedUser.id === id) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Deletion failed:', error);
      showNotification('Failed to delete user account.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Route to edit mode
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setCurrentPage('add');
  };

  // Route to add mode
  const handleAddModeClick = () => {
    setSelectedUser(null);
    setCurrentPage('add');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title-section">
          <h1>Accounts Department Portal</h1>
          <p className="subtitle">Confidential Internal Utility & User Registry</p>
        </div>
        
        <nav className="app-navigation">
          <button 
            type="button" 
            className={`nav-link ${currentPage === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentPage('list')}
          >
            User Listing Registry
          </button>
          <button 
            type="button" 
            className={`nav-link ${currentPage === 'add' ? 'active' : ''}`}
            onClick={handleAddModeClick}
          >
            {selectedUser ? 'Edit User Account' : 'Add User Account'}
          </button>
          <button 
            type="button" 
            className={`nav-link ${currentPage === 'search' ? 'active' : ''}`}
            onClick={() => {
              setSearchResults([]);
              setCurrentPage('search');
            }}
          >
            Search User Registry
          </button>
        </nav>
      </header>

      {notification && (
        <div className={`notification notification-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}

      <main className="app-main">
        {loading && <div className="page-loader">Loading Registry Data...</div>}

        {currentPage === 'list' && (
          <div className="page-section animate-slide-up">
            <div className="section-header">
              <h2>User Listing Registry</h2>
              <button className="btn btn-primary" onClick={handleAddModeClick}>
                + Add New User
              </button>
            </div>
            <UserTable
              users={users}
              onEditUser={handleEditClick}
              onDeleteUser={handleDeleteUser}
            />
          </div>
        )}

        {currentPage === 'add' && (
          <div className="page-section max-width-form animate-slide-up">
            <UserForm
              selectedUser={selectedUser}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setSelectedUser(null);
                setCurrentPage('list');
              }}
            />
          </div>
        )}

        {currentPage === 'search' && (
          <div className="jala-search-page animate-slide-up">
            <div className="jala-card">
              {/* Header section with connection line logo */}
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

              {/* Controlled Search Form */}
              <SearchBar onSearch={handleSearch} />

              {/* Status and Details table */}
              {hasSearched && (
                <div className="jala-results-container">
                  <div className="jala-status-banner">
                    STATUS: {searchResults.length > 0 ? searchResults[0].status : 'Unknown'}
                  </div>

                  {searchResults.length > 0 ? (
                    <>
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
                      
                      <div className="jala-actions">
                        <button
                          type="button"
                          className="btn-action btn-edit jala-action-btn"
                          onClick={() => handleEditClick(searchResults[0])}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-action btn-delete jala-action-btn"
                          onClick={() => handleDeleteUser(searchResults[0].id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="jala-not-found-message">
                      No matching user account found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Accounts Department. Strictly for Internal Authorization & Administration.</p>
      </footer>
    </div>
  );
}
