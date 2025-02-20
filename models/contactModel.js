
const mongoose = require('mongoose');
const cors = require('cors');

const contactSchema = new mongoose.Schema({
  firstname: { 
    type: String, 
    required: true,
    match: /^[A-Za-z]+$/, // Only alphabet characters for first name
    maxlength: 15 // Maximum length of 15 characters
  },
  lastname: { 
    type: String, 
    required: true,
    match: /^[A-Za-z]+$/, // Only alphabet characters for last name
    maxlength: 15 // Maximum length of 15 characters
  },
  email: { 
    type: String, 
    required: true, 
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // Email format validation
  },
  phone: { 
    type: String, 
    required: true,
    match: /^[0-9]{10}$/ // 10 digit phone number
  },
  service: { 
    type: String, 
    required: true
  },
  message: { 
    type: String, 
    required: true,
    match: /^[A-Za-z\s]+$/, // Only allows letters and spaces
    maxlength: 100 // Maximum length of 100 characters
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

  
  // Create a model for the contact based on the schema
  const Contact = mongoose.model('Contact', contactSchema);
  
  // Export the model
  module.exports = Contact;