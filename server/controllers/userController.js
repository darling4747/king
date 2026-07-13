const db = require('../config/db');

// Helper to validate name: 2-100 chars, only letters, spaces, apostrophes, hyphens, and periods
const isValidName = (name) => {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 100) return false;
  const nameRegex = /^[a-zA-Z\s'\-\.]+$/;
  return nameRegex.test(trimmed);
};

// Helper to validate phone: exactly 12 digits, no other characters
const isValidPhone = (phone) => {
  if (typeof phone !== 'string') return false;
  const phoneRegex = /^\d{12}$/;
  return phoneRegex.test(phone);
};

// Helper to validate email format
const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
};

// Helper to validate if date string is a valid calendar date (YYYY-MM-DD)
const isValidDate = (dateStr) => {
  if (typeof dateStr !== 'string') return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const d = new Date(dateStr);
  return d instanceof Date && !isNaN(d.getTime());
};

// GET /api/users - View all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users ORDER BY id DESC');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ error: 'Internal Server Error', details: 'A database error occurred while retrieving user accounts.' });
  }
};

// GET /api/users/search - Search user by phone number
exports.searchUserByPhone = async (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: 'Validation Failed', details: ['Phone number query parameter is required.'] });
  }

  const phoneStr = phone.trim();
  if (!isValidPhone(phoneStr)) {
    return res.status(400).json({ error: 'Validation Failed', details: ['Invalid search phone number format.'] });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE phone = ?', [phoneStr]);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in searchUserByPhone:', error);
    res.status(500).json({ error: 'Internal Server Error', details: 'A database error occurred during the search.' });
  }
};

// POST /api/users - Add a new user
exports.createUser = async (req, res) => {
  const { name, phone, email, joining_date, inactive_on, status, message } = req.body;
  const errors = [];

  // Name Validation
  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required.');
  } else if (!isValidName(name)) {
    errors.push("Name must be between 2 and 100 characters and contain only letters, spaces, apostrophes, hyphens, and periods.");
  }

  // Phone Validation
  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    errors.push('Phone number is required.');
  } else if (!isValidPhone(phone.trim())) {
    errors.push('Phone number must be exactly 12 digits and contain no spaces or invalid characters.');
  }

  // Email Validation
  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.push('Email address is required.');
  } else if (!isValidEmail(email.trim())) {
    errors.push('Email address format is invalid or exceeds 100 characters.');
  }

  // Joining Date Validation
  if (!joining_date || !isValidDate(joining_date)) {
    errors.push('A valid Joining Date (YYYY-MM-DD) is required.');
  }

  // Inactive On Validation
  if (inactive_on && inactive_on.trim() !== '') {
    if (!isValidDate(inactive_on)) {
      errors.push('Inactive On must be a valid date (YYYY-MM-DD).');
    } else if (joining_date && isValidDate(joining_date)) {
      const joinDate = new Date(joining_date);
      const inactiveDate = new Date(inactive_on);
      if (inactiveDate < joinDate) {
        errors.push('Inactive On date cannot be earlier than the Joining Date.');
      }
    }
  }

  // Status Validation
  const validStatuses = ['Active', 'Inactive', 'Suspended', 'Expired', 'Blocked', 'Unknown'];
  if (!status || !validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}.`);
  }

  // Message Validation
  if (message && message.length > 500) {
    errors.push('Message cannot exceed 500 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation Failed', details: errors });
  }

  const normalizedPhone = phone.trim();
  const normalizedEmail = email.trim().toLowerCase();

  try {
    // Check uniqueness of Phone
    const [existingPhone] = await db.query('SELECT id FROM users WHERE phone = ?', [normalizedPhone]);
    if (existingPhone.length > 0) {
      return res.status(409).json({ error: 'Conflict Error', details: ['Phone number is already registered.'] });
    }

    // Check uniqueness of Email
    const [existingEmail] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
    if (existingEmail.length > 0) {
      return res.status(409).json({ error: 'Conflict Error', details: ['Email address is already registered.'] });
    }

    const [result] = await db.query(
      `INSERT INTO users (name, phone, email, joining_date, inactive_on, status, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        normalizedPhone,
        normalizedEmail,
        joining_date,
        (inactive_on && inactive_on.trim() !== '') ? inactive_on : null,
        status,
        message ? message.trim() : null
      ]
    );

    const newUser = {
      id: result.insertId,
      name: name.trim(),
      phone: normalizedPhone,
      email: normalizedEmail,
      joining_date,
      inactive_on: (inactive_on && inactive_on.trim() !== '') ? inactive_on : null,
      status,
      message: message ? message.trim() : null
    };

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({ error: 'Internal Server Error', details: 'A database error occurred while creating the user account.' });
  }
};

// PUT /api/users/:id - Edit an existing user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, joining_date, inactive_on, status, message } = req.body;
  const errors = [];

  // Name Validation
  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required.');
  } else if (!isValidName(name)) {
    errors.push("Name must be between 2 and 100 characters and contain only letters, spaces, apostrophes, hyphens, and periods.");
  }

  // Phone Validation
  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    errors.push('Phone number is required.');
  } else if (!isValidPhone(phone.trim())) {
    errors.push('Phone number must be exactly 12 digits and contain no spaces or invalid characters.');
  }

  // Email Validation
  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.push('Email address is required.');
  } else if (!isValidEmail(email.trim())) {
    errors.push('Email address format is invalid or exceeds 100 characters.');
  }

  // Joining Date Validation
  if (!joining_date || !isValidDate(joining_date)) {
    errors.push('A valid Joining Date (YYYY-MM-DD) is required.');
  }

  // Inactive On Validation
  if (inactive_on && inactive_on.trim() !== '') {
    if (!isValidDate(inactive_on)) {
      errors.push('Inactive On must be a valid date (YYYY-MM-DD).');
    } else if (joining_date && isValidDate(joining_date)) {
      const joinDate = new Date(joining_date);
      const inactiveDate = new Date(inactive_on);
      if (inactiveDate < joinDate) {
        errors.push('Inactive On date cannot be earlier than the Joining Date.');
      }
    }
  }

  // Status Validation
  const validStatuses = ['Active', 'Inactive', 'Suspended', 'Expired', 'Blocked', 'Unknown'];
  if (!status || !validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}.`);
  }

  // Message Validation
  if (message && message.length > 500) {
    errors.push('Message cannot exceed 500 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation Failed', details: errors });
  }

  const normalizedPhone = phone.trim();
  const normalizedEmail = email.trim().toLowerCase();

  try {
    // Verify user exists
    const [existingUser] = await db.query('SELECT id FROM users WHERE id = ?', [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'Not Found', details: ['User account not found.'] });
    }

    // Check duplicate phone on other accounts
    const [duplicatePhone] = await db.query('SELECT id FROM users WHERE phone = ? AND id != ?', [normalizedPhone, id]);
    if (duplicatePhone.length > 0) {
      return res.status(409).json({ error: 'Conflict Error', details: ['Phone number is already in use by another account.'] });
    }

    // Check duplicate email on other accounts
    const [duplicateEmail] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [normalizedEmail, id]);
    if (duplicateEmail.length > 0) {
      return res.status(409).json({ error: 'Conflict Error', details: ['Email address is already in use by another account.'] });
    }

    await db.query(
      `UPDATE users 
       SET name = ?, phone = ?, email = ?, joining_date = ?, inactive_on = ?, status = ?, message = ?
       WHERE id = ?`,
      [
        name.trim(),
        normalizedPhone,
        normalizedEmail,
        joining_date,
        (inactive_on && inactive_on.trim() !== '') ? inactive_on : null,
        status,
        message ? message.trim() : null,
        id
      ]
    );

    const updatedUser = {
      id: parseInt(id),
      name: name.trim(),
      phone: normalizedPhone,
      email: normalizedEmail,
      joining_date,
      inactive_on: (inactive_on && inactive_on.trim() !== '') ? inactive_on : null,
      status,
      message: message ? message.trim() : null
    };

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in updateUser:', error);
    res.status(500).json({ error: 'Internal Server Error', details: 'A database error occurred while updating the user account.' });
  }
};

// DELETE /api/users/:id - Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [existingUser] = await db.query('SELECT id FROM users WHERE id = ?', [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'Not Found', details: ['User account not found.'] });
    }

    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'User account successfully deleted.' });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({ error: 'Internal Server Error', details: 'A database error occurred while deleting the user account.' });
  }
};
