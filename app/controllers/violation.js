const Violation = require("../models/violation.js");

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
    investigator_id: req.body.investigator_id,
    recall_id: req.body.recall_id,
    violation_status: req.body.violation_status,
  });

  // Save Violation in the database
  Violation.create(violation, (err, data) => {
    console.log(violation);
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