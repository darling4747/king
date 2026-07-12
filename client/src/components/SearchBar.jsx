import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [phone, setPhone] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = phone.trim();
    
    if (!query) {
      setValidationError('');
      onSearch('');
      return;
    }

    // Strict E.164 phone check: optional '+' followed by 8 to 15 digits, no special characters or spaces
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    if (!phoneRegex.test(query)) {
      setValidationError("Search query must be between 8 and 15 digits (excluding optional '+') and contain no spaces or formatting characters.");
      return;
    }

    setValidationError('');
    onSearch(query);
  };

  const handleClear = () => {
    setPhone('');
    setValidationError('');
    onSearch('');
  };

  return (
    <div className="search-bar-container jala-search-wrapper">
      <form className="search-bar-form jala-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Enter phone number..."
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (validationError) setValidationError('');
            }}
            className="search-input jala-input"
          />
          {phone && (
            <button type="button" className="btn-clear jala-clear" onClick={handleClear}>
              &times;
            </button>
          )}
        </div>
        <button type="submit" className="btn jala-search-btn">
          SEARCH HERE
        </button>
      </form>
      {validationError && (
        <div className="search-validation-error jala-error">
          {validationError}
        </div>
      )}
    </div>
  );
}
