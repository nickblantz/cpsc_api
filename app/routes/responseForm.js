module.exports = app => {
  const controller = require("../controllers/responseForm.js");

  // Create a new ResponseForm
  app.post("/response-form", controller.create);

  // Retrieve a single ResponseForm with form_id
  app.post("/response-form/access", controller.access);

  // Update a ResponseForm
  app.put("/response-form/:form_id", controller.update);
};