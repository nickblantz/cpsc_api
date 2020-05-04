const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
var connection;


function connectDatabase() { 
  connection = mysql.createConnection({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    typeCast: function castField(field, useDefaultTypeCast) {
      if (field.type === "BIT" && field.length === 1) {
        var bytes = field.buffer();
        return (bytes[0] == 1);
      } 
      return(useDefaultTypeCast());
    }
  });

  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
  connection.on('error', function(err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      connectDatabase();
    } else {                                   
      throw err;
    }
  });
}

function getConnection() {
  if (connection.state === 'disconnected') {
    connectDatabase();
  }
  return connection;
}

connectDatabase();
module.exports = getConnection;
