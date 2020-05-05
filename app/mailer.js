var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD
  }
});

const Mailer = function() {};

Mailer.sendViolationEmail = (recipientEmail, recipientName, recipientPassword, recallNumber, violationLink, responseLink, callback) => {
  var email = {
    from: "admin@cpscraper.com",
    to: recipientEmail,
    subject: "[ACTION REQUIRED] Listing was Flagged as Recalled Product",
    html: `<h4>Your listing <a href="${violationLink}">here</a> was flagged for violating this recall number ${recallNumber}<br />Go to the link provided below to respond</h4><p><a href="${responseLink}">${responseLink}</a></p><p>Email: <span style="font-weight:bold;">${recipientEmail}</span></p><p>Password: <span style="font-weight:bold;">${recipientPassword}</span></p>`
  }
  
  transporter.sendMail(email, function(error, info) {
    if (error) {
      console.log('Could not send email');
      callback(false);
    } else {
      console.log('Email successfully sent');
      callback(true);
      
    }
    return;
  });
};

module.exports = Mailer;
