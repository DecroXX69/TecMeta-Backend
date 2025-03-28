const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: false }, // Make optional for marketing popup
    email: { type: String, required: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ },
    phone: { type: String, required: true },
    service: { type: String, required: false }, // Make optional for marketing popup
    message: { type: String, required: false }, // Make optional for marketing popup
    source: { 
        type: String, 
        enum: ['contact-form', 'marketing-popup'], 
        default: 'contact-form' 
    },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;