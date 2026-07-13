import React, { useState, useEffect } from 'react';

const INITIAL_STATE = {
  name: '',
  phone: '',
  email: '',
  joining_date: '',
  inactive_on: '',
  status: 'Active',
  message: ''
};

export default function UserForm({ selectedUser, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);

  // Load selection details on edit mode transition
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || '',
        phone: selectedUser.phone || '',
        email: selectedUser.email || '',
        joining_date: selectedUser.joining_date ? selectedUser.joining_date.substring(0, 10) : '',
        inactive_on: selectedUser.inactive_on ? selectedUser.inactive_on.substring(0, 10) : '',
        status: selectedUser.status || 'Active',
        message: selectedUser.message || ''
      });
      setErrors([]);
    } else {
      setFormData(INITIAL_STATE);
      setErrors([]);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 12) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: nextValue
    }));
  };

  const validateForm = () => {
    const errs = [];
    
    // Name Validation: 2-100 characters, letters, spaces, apostrophes, hyphens, periods only
    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed) {
      errs.push('Name is required.');
    } else if (nameTrimmed.length < 2 || nameTrimmed.length > 100) {
      errs.push('Name must be between 2 and 100 characters.');
    } else {
      const nameRegex = /^[a-zA-Z\s'\-\.]+$/;
      if (!nameRegex.test(nameTrimmed)) {
        errs.push("Name can only contain letters, spaces, apostrophes ('), hyphens (-), and periods (.).");
      }
    }

    // Phone Validation: exactly 12 digits, reject invalid characters
    const phoneTrimmed = formData.phone.trim();
    if (!phoneTrimmed) {
      errs.push('Phone number is required.');
    } else {
      const phoneRegex = /^\d{12}$/;
      if (!phoneRegex.test(phoneTrimmed)) {
        errs.push('Phone number must be exactly 12 digits and contain no spaces or invalid characters.');
      }
    }

    // Email Validation: format check, lowercase translation handled before submission
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      errs.push('Email address is required.');
    } else if (emailTrimmed.length > 100) {
      errs.push('Email address must not exceed 100 characters.');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        errs.push('Email address format is invalid.');
      }
    }

    // Joining Date Validation
    if (!formData.joining_date) {
      errs.push('Joining Date is required.');
    } else {
      const joinDate = new Date(formData.joining_date);
      if (isNaN(joinDate.getTime())) {
        errs.push('Joining Date is invalid.');
      }
    }

    // Inactive On Date Validation: cannot be earlier than Joining Date
    if (formData.inactive_on && formData.inactive_on.trim() !== '') {
      const inactiveDate = new Date(formData.inactive_on);
      if (isNaN(inactiveDate.getTime())) {
        errs.push('Inactive On Date is invalid.');
      } else if (formData.joining_date) {
        const joinDate = new Date(formData.joining_date);
        if (inactiveDate < joinDate) {
          errs.push('Inactive On date cannot be earlier than the Joining Date.');
        }
      }
    }

    // Status Validation
    const validStatuses = ['Active', 'Inactive', 'Suspended', 'Expired', 'Blocked', 'Unknown'];
    if (!formData.status || !validStatuses.includes(formData.status)) {
      errs.push('A valid status selection is required.');
    }

    // Message Validation: max 500 characters
    if (formData.message && formData.message.length > 500) {
      errs.push('Message description must not exceed 500 characters.');
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const submissionData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim().toLowerCase(), // Lowercase before sending
      joining_date: formData.joining_date,
      inactive_on: (formData.inactive_on && formData.inactive_on.trim() !== '') ? formData.inactive_on : null,
      status: formData.status,
      message: formData.message.trim() ? formData.message.trim() : null
    };

    onSubmit(submissionData);
  };

  return (
    <div className="form-container">
      <h3>{selectedUser && selectedUser.id ? 'Edit User Account' : 'Add User Account'}</h3>
      
      {errors.length > 0 && (
        <div className="validation-error-alert">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="text"
            id="phone"
            name="phone"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={12}
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 12-digit phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@company.com"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="joining_date">Joining Date *</label>
            <input
              type="date"
              id="joining_date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="inactive_on">Inactive On</label>
            <input
              type="date"
              id="inactive_on"
              name="inactive_on"
              value={formData.inactive_on}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
            <option value="Expired">Expired</option>
            <option value="Blocked">Blocked</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message / Notes</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Optional notes (max 500 characters)..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            {selectedUser && selectedUser.id ? 'Save Changes' : 'Create Account'}
          </button>
          {selectedUser && (
            <button type="button" className="btn btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
