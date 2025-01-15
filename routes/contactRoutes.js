// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');  // Destructure createContact

// Define POST route for "Contact Us"
router.post('/contact', createContact);
// Define GET route to fetch all contacts
router.get('/contacts', getContacts);

module.exports = router;
