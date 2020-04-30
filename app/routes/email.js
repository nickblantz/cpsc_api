module.exports = app => {
  const controller = require("../controllers/email.js");

  // Create a new Email
  app.post("/email", controller.create);

  // Retrieve all from specified parameters
  // app.post("/email/search", controller.searchEmails);

  // Retrieve a single Email with emailId
  // app.get("/email/:email_id", controller.findOne);

  // Update a Email with emailId
  // app.put("/email/:email_id", controller.update);

  // Delete a Email with emailId
  // app.delete("/email/:email_id", controller.delete);

  // Delete all Emails
  // app.delete("/email", controller.deleteAll);
};