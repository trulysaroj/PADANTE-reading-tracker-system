const nodemailer = require('nodemailer');

const emailManager = async (to, text, html, subject) => {

// Sending mail for notification using nodemailer:
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "262492c8b4d7c6",  
      pass: "1dd3266fba16d8" 
    }
  });

  await transport.sendMail({
    to: to,
    from: "info@padante.com",
    text: text,
    html: html,
    subject: subject

  })

}

module.exports = emailManager;