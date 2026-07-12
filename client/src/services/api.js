import axios from 'axios';

// Configure Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET /api/users - Fetch all users
export const getAllUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

// GET /api/users/search?phone= - Search user by phone number
export const searchUserByPhone = async (phone) => {
  const response = await API.get(`/users/search?phone=${encodeURIComponent(phone)}`);
  return response.data;
};

// POST /api/users - Add a new user
export const createUser = async (userData) => {
  const response = await API.post('/users', userData);
  return response.data;
};

// PUT /api/users/:id - Update user details
export const updateUser = async (id, userData) => {
  const response = await API.put(`/users/${id}`, userData);
  return response.data;
};

// DELETE /api/users/:id - Remove user by ID
export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};
