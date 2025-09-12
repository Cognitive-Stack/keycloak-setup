require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const auth = require('./src/middleware/auth');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check route
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const apiRouter = require('./src/routes');
app.use('/api/v1', auth, apiRouter);

// Error handler for unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalid or missing token' });
  } else {
    next(err);
  }
});

module.exports = app;
