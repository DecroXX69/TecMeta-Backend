// controllers/contactController.js

const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

// Create a new contact message
async function createContact(req, res) {
  const { firstname, lastname, email, phone,service, message } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email || !phone || !service || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new contact instance
    const newContact = new Contact({
      firstname,
      lastname,
      email,
      phone,
      service,
      message,
    });

    // Save the contact to the database
    const savedContact = await newContact.save();

                // Send email to the desired email address
                const transporter = nodemailer.createTransport({
                  host: 'smtppro.zoho.in',  // or you can use another email service like Outlook, SendGrid, etc.
                  port: 465,  // SSL port
                  secure: true,
                  auth: {
                      user: 'admin@tecmetaverse.com',  // Replace with your email address
                      pass: 'NZjaPHiBezAj',   // Replace with your email password (or app password if 2FA enabled)
                  }
              });
      
              // Prepare the email content
              const mailOptions = {
                  from: 'admin@tecmetaverse.com',
                  to: 'info@tecmetaverse.com', // Replace with the email address you want to send to
                  subject: 'New Contact Us Form Submission',
                  text: `New contact message received:
      
      Firstname: ${firstname}
      Lastname: ${lastname}
      Email: ${email}
      Phone: ${phone}
      Service: ${service}
      
      
      Message:
      ${message}`
              };
      
              // Send the email
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      console.error('Error sending email:', error);
                  } else {
                      console.log('Email sent: ' + info.response);
                  }
              });
      
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
          };

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
