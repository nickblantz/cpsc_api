const https = require('https')
const Recall = require("../models/recall.js");

// Create and Save a new Recall
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Recall
  const recall = new Recall({
      recall_number: req.body.recall_number,
      high_priority: req.body.high_priority,
      date: req.body.date,
      recall_heading: req.body.recall_heading,
      name_of_product: req.body.name_of_product,
      description: req.body.description,
      hazard: req.body.hazard,
      remedy_type: req.body.remedy_type,
      units: req.body.units,
      conjunction_with: req.body.conjunction_with,
      incidents: req.body.incidents,
      remedy: req.body.remedy,
      sold_at: req.body.sold_at,
      distributors: req.body.distributors,
      manufactured_in: req.body.manufactured_in,
  });

  // Save Recall in the database
  Recall.create(recall, (err, data) => {
    console.log(recall);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recall."
      });
    else res.send(data);
  });
};

// Retrieve all Recalls from the database.
exports.searchRecalls = (req, res) => {
  Recall.search(req.body.search, req.body.sort_by, req.body.limit, req.body.offset, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recalls."
      });
    else res.send(data);
  });
};

// Find a single Recall with a recall_id
exports.findOne = (req, res) => {
  Recall.findById(req.params.recall_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Recall with id ${req.params.recall_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Recall with id " + req.params.recall_id
        });
      }
    } else res.send(data);
  });
};

// Update a Recall identified by the recall_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Recall.updateById(
    req.params.recall_id,
    new Recall(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Recall with id ${req.params.recall_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Recall with id " + req.params.recall_id
          });
        }
      } else {
        if (data.high_priority) {
          const options = {
            hostname: 'scraper.cpscraper.com',
            port: 80,
            path: 'scrape_recall/' + data.recall_id,
            method: 'GET'
          }
          const req = https.request(options, res => {
            res.on('data', d => {
              console.error('started scraping for ' + data.recall_id)
            })
          })
          
          req.on('error', error => {
            console.error(error)
          })
          
          req.end()
        }
        res.send(data);
      }
    }
  );
};

// Delete a Recall with the specified recall_id in the request
exports.delete = (req, res) => {
  Recall.remove(req.params.recall_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Recall with id ${req.params.recall_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Recall with id " + req.params.recall_id
        });
      }
    } else res.send({ message: `Recall was deleted successfully!` });
  });
};

// Delete all Recalls from the database.
exports.deleteAll = (req, res) => {
  Recall.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recalls."
      });
    else res.send({ message: `All Recalls were deleted successfully!` });
  });
};