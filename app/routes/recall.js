module.exports = app => {
    const controller = require("../controllers/recall.js");
  
    // Create a new Recall
    // app.post("/recall", controller.create);
  
    // Retrieve all from specified parameters
    app.post("/recall/search", controller.searchRecalls);
  
    // Retrieve a single Recall with recallId
    app.get("/recall/:recall_id", controller.findOne);
  
    // Update a Recall with recallId
    app.put("/recall/:recall_id", controller.update);
  
    // Delete a Recall with recallId
    // app.delete("/recall/:recall_id", controller.delete);
  
    // Delete all Recalls
    // app.delete("/recall", controller.deleteAll);
  };