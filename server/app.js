const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

const defaultOrigins = [
  'http://localhost:5173',
  'https://accounts-crud-frontend.vercel.app',
  'https://accounts-crud-admin.vercel.app',
];

const configuredOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins]));

// Secure CORS configuration allowing requests from the deployed client apps.
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the user routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Backend is running',
    version: 'v3',
  });
});

// Root health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Catch-all route handler for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint Not Found' });
});

module.exports = app;
