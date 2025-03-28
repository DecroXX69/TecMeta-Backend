const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');

// Define POST route for "Contact Us"
router.post('/contact', createContact);

// Define POST route for Marketing Popup Leads
router.post('/marketing-leads', createContact);

// Define GET route to fetch all contacts
router.get('/contacts', getContacts);

module.exports = router;