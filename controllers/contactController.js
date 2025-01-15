// controllers/contactController.js

const Contact = require('../models/contactModel');

// Create a new contact message
async function createContact(req, res) {
  const { firstname, lastname, email, phone, message } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new contact instance
    const newContact = new Contact({
      firstname,
      lastname,
      email,
      phone,
      message,
    });

    // Save the contact to the database
    const savedContact = await newContact.save();

    // Respond with a success message and the saved contact data
    res.status(200).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon.',
      data: savedContact,
    });
  } catch (error) {
    res.status(500).json({ error: 'There was an error saving the message.' });
  }
}

// Get all contact messages
async function getContacts(req, res) {
    try {
      const contacts = await Contact.find(); // Retrieve all contact messages from the database
      res.status(200).json({
        success: true,
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({ error: 'There was an error fetching the contact messages.' });
    }
  }

// Export the function so it can be used in other files
module.exports = { createContact, getContacts };
