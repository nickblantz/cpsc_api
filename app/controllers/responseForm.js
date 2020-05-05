const ResponseForm = require("../models/responseForm.js")

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  // Create a ResponseForm
  const responseForm = new ResponseForm({
    form_completion_date: req.body.form_completion_date,
    acknowledgement: req.body.acknowledgement,
    response: req.body.response,
    vendor_id: req.body.vendor_id
  });

  // Save ResponseForm in the database
  ResponseForm.create(responseForm, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the ResponseForm." });
    else res.send(data);
  });
};

exports.access = (req, res) => {
  ResponseForm.access(req.body.form_id, req.body.vendor_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Vendor ${req.body.vendor_id} can not access response form ${req.body.form_id}.` });
      } else {
        res.status(500).send({ message: "Error retrieving ResponseForm with id " + req.body.form_id });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate() + 1).toString().padStart(2, "0");

  const responseForm = new ResponseForm({
    form_completion_date: `${year}-${month}-${day}`,
    acknowledgement: req.body.acknowledgement,
    response: req.body.response,
    vendor_id: -1
  });

  ResponseForm.updateById(req.params.form_id, responseForm, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found ResponseForm with id ${req.params.form_id}.` });
      } else {
        res.status(500).send({ message: "Error updating ResponseForm with id " + req.params.form_id });
      }
    } else res.send(data);
  });
};