const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: { type: String, required: true, match: /^[A-Za-z]+$/, maxlength: 15 }, // Only alphabet characters for first name, max length 15
    lastname: { type: String, required: false, match: /^[A-Za-z]+$/, maxlength: 15 }, // Make optional for marketing popup
    email: { type: String, required: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ },
    phone: { type: String, required: true, match: /^[0-9]{10}$/ },
    service: { type: String, required: false }, // Make optional for marketing popup
    message: { type: String, required: false, match: /^[A-Za-z\s]+$/,maxlength: 100 }, // Make optional for marketing popup
    source: { 
        type: String, 
        enum: ['contact-form', 'marketing-popup'], 
        default: 'contact-form' 
    },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
