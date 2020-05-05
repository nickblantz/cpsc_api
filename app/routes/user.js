module.exports = app => {
    const controller = require("../controllers/user.js");
  
    // Create a new User
    app.post("/user", controller.create);

    // Checks if credentials are correct
    app.post("/user/login", controller.login)
  
    // Retrieve all Users
    // app.get("/user", controller.findAll);
  
    // Retrieve a single User with userId
    // app.get("/user/:user_id", controller.findOne);
  
    // Update a User with userId
    // app.put("/user/:user_id", controller.update);
  
    // Delete a User with userId
    // app.delete("/user/:user_id", controller.delete);
  
    // Delete all Users
    // app.delete("/user", controller.deleteAll);

    
  };