const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, data, template }) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const message = {
    from: `"JobBoard" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: generateHtml(template, data)
  };

  await transporter.sendMail(message);
};

// Simple template system (customize as needed)
const generateHtml = (template, data) => {
  if (template === 'emailVerification') {
    return `<h1>Hello ${data.name},</h1><p>Click <a href="${data.verificationUrl}">here</a> to verify your email.</p>`;
  } else if (template === 'passwordReset') {
    return `<h1>Reset Your Password</h1><p>Click <a href="${data.resetUrl}">here</a> to reset your password.</p>`;
  } else {
    return `<p>Hi ${data.name},</p><p>This is a system email.</p>`;
  }
};

module.exports = sendEmail;
// Utility function to send emails using nodemailer and templates