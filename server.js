// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO || 'your@email.com',
    subject: 'New Email Entered',
    text: `User entered email: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
