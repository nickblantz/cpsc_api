const bodyParser = require("body-parser");
const cors = require('cors');
const express = require("express");

// create a new express app
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// allows requests to be made across origins
app.use(cors()); 

// set port, listen for requests
app.listen(80, () => {
  console.log("Server is running on port 3033.");
});

// register routes with the app
require ('./app/routes/user.js')(app);
require ('./app/routes/recall.js')(app);
require ('./app/routes/violation.js')(app);