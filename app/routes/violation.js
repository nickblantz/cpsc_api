module.exports = app => {
    const controller = require("../controllers/violation.js");
  
    // Create a new Violation
    // app.post("/violation", controller.create);
  
    // Retrieve all from specified parameters
    app.post("/violation/search", controller.searchViolations);
  
    // Retrieve a single Violation with violationId
    app.get("/violation/:violation_id", controller.findOne);
  
    // Update a Violation with violationId
    app.put("/violation/:violation_id", controller.update);
  
    // Delete a Violation with violationId
    // app.delete("/violation/:violation_id", controller.delete);
  
    // Delete all Violations
    // app.delete("/violation", controller.deleteAll);
  };