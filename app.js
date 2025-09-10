require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check route
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Main router (to be implemented in a later story)
// const apiRouter = require('./src/routes');
// app.use('/api/v1', apiRouter);

module.exports = app;
