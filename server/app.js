const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Secure CORS configuration allowing requests only from the specified client URL
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the user routes
app.use('/api/users', userRoutes);

// Root health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Catch-all route handler for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint Not Found' });
});

module.exports = app;
