const User = require("../models/user.js");

// Create and Save a new User
exports.create = (req, res) => {
    console.log(req);
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      user_type: req.body.user_type
    });
  
    // Save User in the database
    User.create(user, (err, data) => {
      console.log(user);
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data);
    });
  };

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
  };

// Find a single User with a user_id
exports.findOne = (req, res) => {
    User.findById(req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.user_id
          });
        }
      } else res.send(data);
    });
  };

exports.login = (req, res) => {
    console.log(req);
    User.login(req.body.email, req.body.password, (err, data) => {
        if (err) {
            res.send({
                message: "Incorrect email or password"
            });
        } else {
            res.send(data);
        }
    });
};

// Update a User identified by the user_id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    User.updateById(
      req.params.user_id,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.user_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.user_id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a User with the specified user_id in the request
exports.delete = (req, res) => {
    User.remove(req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.user_id
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      else res.send({ message: `All Users were deleted successfully!` });
    });
  };