var request = require("request");
const Email = require("../models/email.js");

// Create and Save a new Email
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Email
  const email = new Email({
    email_address: req.body.email_address,
    full_name: req.body.full_name,
    marketplace: req.body.marketplace,
    violation_id: req.body.violation_id
  });

  // Save Email in the database
  Email.create(email, (err, data) => {
    console.log(email);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Email."
      });
    else res.send(data);
  });
};
