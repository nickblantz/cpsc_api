const Violation = require("../models/violation.js")
const Recall = require("../models/recall.js")
const User = require("../models/user.js");
const Mailer = require("../mailer.js")

// Create and Save a new Violation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Violation
  const violation = new Violation({
    violation_date: req.body.violation_date,
    url: req.body.url,
    title: req.body.title,
    screenshot_file: req.body.screenshot_file,
    investigator_id: req.body.investigator_id,
    vendor_id: req.body.vendor_id,
    recall_id: req.body.recall_id,
    violation_status: req.body.violation_status
  });

  // Save Violation in the database
  Violation.create(violation, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Violation."
      });
    else res.send(data);
  });
};

// Retrieve all Violations from the database.
exports.searchViolations = (req, res) => {
  Violation.search(req.body.violation_status, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving violations."
      });
    else res.send(data);
  });
};

// Find a single Violation with a violation_id
exports.findOne = (req, res) => {
  Violation.findById(req.params.violation_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Violation with id ${req.params.violation_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Violation with id " + req.params.violation_id
        });
      }
    } else res.send(data);
  });
};

// Update a Violation identified by the violation_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Violation.updateById(
    req.params.violation_id,
    new Violation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Violation with id ${req.params.violation_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Violation with id " + req.params.violation_id
          });
        }
      } else res.send(data);
    }
  );
};

exports.confirm = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  function makePassword(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const _user = new User({
    email: req.body.vendor.email,
    password: makePassword(12),
    first_name: req.body.vendor.full_name,
    user_type: "Vendor"
  });

  User.create(_user, (err, user) => {
    if (err) {
      res.status(500).send({
        message: "Confirm Violation: Could not create vendor"
      });
    } else {

      const _violation = new Violation({
        violation_date: req.body.violation.violation_date,
        url: req.body.violation.url,
        title: req.body.violation.title,
        screenshot_file: req.body.violation.screenshot_file,
        investigator_id: req.body.violation.investigator_id,
        vendor_id: user.user_id,
        recall_id: req.body.violation.recall_id,
        violation_status: "Confirmed"
      });

      Violation.updateById(req.params.violation_id, _violation, (err, violation) => {
        if (err) {
          res.status(500).send({
            message: "Confirm Violation: Could not update Violation with id " + req.params.violation_id
          });
        } else {
          Recall.findById(violation.recall_id, (err, recall) => {
            if (err) {
              res.status(500).send({
                message: "Confirm Violation: Could not find recall with id " + violation.recall_id
              });
            } else {
              Mailer.sendViolationEmail(user.email, user.first_name, user.password, recall.recall_number, violation.url, "http://www.cpscraper.com/")
              res.send(violation);
            }
          });
        }
      });
    }
  });
};

// Delete a Violation with the specified violation_id in the request
exports.delete = (req, res) => {
  Violation.remove(req.params.violation_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Violation with id ${req.params.violation_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Violation with id " + req.params.violation_id
        });
      }
    } else res.send({ message: `Violation was deleted successfully!` });
  });
};

// Delete all Violations from the database.
exports.deleteAll = (req, res) => {
  Violation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all violations."
      });
    else res.send({ message: `All Violations were deleted successfully!` });
  });
};