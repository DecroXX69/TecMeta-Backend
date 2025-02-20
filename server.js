// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();
const cors = require('cors');
// Initialize express app
const app = express();

// Middleware to parse JSON request body
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Allow all origins; for production, specify your frontend domain
  methods: ['GET', 'POST'], // Allow specific methods
  allowedHeaders: ['Content-Type'],
}));

// MongoDB connection (replace with your actual MongoDB connection string)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use contact routes
app.use('/api', contactRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
