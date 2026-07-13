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

    const phoneRegex = /^\d{12}$/;
    if (!phoneRegex.test(query)) {
      setValidationError('Please enter exactly 12 digits.');
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
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={12}
            placeholder="Enter 12-digit phone number..."
            value={phone}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 12);
              setPhone(digitsOnly);
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
