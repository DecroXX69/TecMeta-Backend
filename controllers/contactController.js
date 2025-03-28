const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

// Create a new contact message (generic method for both contact form and marketing popup)
async function createContact(req, res) {
    const { 
        name, // For marketing popup
        firstname, // For contact form
        lastname, 
        email, 
        phone, 
        service, 
        message 
    } = req.body;

    // Determine source and handle different input formats
    const source = req.body.source || 'contact-form';
    let contactData = {};

    if (source === 'marketing-popup') {
        // Handle marketing popup submission
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        // Split name into first and last name if possible
        const nameParts = name.trim().split(' ');
        contactData = {
            firstname: nameParts[0],
            lastname: nameParts.slice(1).join(' ') || '',
            email,
            phone,
            source: 'marketing-popup'
        };
    } else {
        // Handle traditional contact form
        if (!firstname || !lastname || !email || !phone || !service || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        contactData = {
            firstname,
            lastname,
            email,
            phone,
            service,
            message,
            source: 'contact-form'
        };
    }

    try {
        // Create a new contact instance
        const newContact = new Contact(contactData);

        // Save the contact to the database
        const savedContact = await newContact.save();

        // Send email notification
        await sendContactNotificationEmail(contactData);

        // Send response with success message and saved data
        res.status(201).json({
            message: 'Contact message created successfully',
            data: savedContact
        });
    } catch (error) {
        // Handle errors, like validation errors or DB connection issues
        console.error(error);
        res.status(500).json({
            message: 'Error creating contact message',
            error: error.message
        });
    }
}

// Helper function to send email notification
async function sendContactNotificationEmail(contactData) {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: 'smtppro.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: 'admin@tecmetaverse.com',
                pass: 'NZjaPHiBezAj',
            }
        });

        // Prepare email content based on source
        const mailSubject = contactData.source === 'marketing-popup' 
            ? 'New Marketing Popup Lead' 
            : 'New Contact Us Form Submission';

        const mailText = contactData.source === 'marketing-popup' 
            ? `New Marketing Popup Lead:

Name: ${contactData.firstname} ${contactData.lastname}
Email: ${contactData.email}
Phone: ${contactData.phone}` 
            : `New contact message received:

Firstname: ${contactData.firstname}
Lastname: ${contactData.lastname}
Email: ${contactData.email}
Phone: ${contactData.phone}
Service: ${contactData.service}

Message:
${contactData.message}`;

        // Prepare mail options
        const mailOptions = {
            from: 'admin@tecmetaverse.com',
            to: 'info@tecmetaverse.com',
            subject: mailSubject,
            text: mailText
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
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

// Export the functions
module.exports = { createContact, getContacts };