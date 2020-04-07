const bodyParser = require("body-parser");
const cors = require('cors');
const express = require("express");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// allows requests to be made across origins
app.use(cors()); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "nothing in root" });
});

// set port, listen for requests
app.listen(3033, () => {
  console.log("Server is running on port 3033.");
});

require ('./app/routes/user.js')(app);
require ('./app/routes/recall.js')(app);