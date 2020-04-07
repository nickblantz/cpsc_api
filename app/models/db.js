const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
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

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;