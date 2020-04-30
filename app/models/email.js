const getConnection = require("./db.js");

const Email = function(email) {
  this.email_address = email.email_address;
  this.full_name = email.full_name;
  this.marketplace = email.marketplace;
  this.violation_id = email.violation_id;
};

Email.create = (newEmail, result) => {
  var conn = getConnection();
  conn.query("INSERT INTO email SET ?", newEmail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created email: ", { email_id: parseInt(res.insertId), ...newEmail });
    result(null, { email_id: parseInt(res.insertId), ...newEmail });
  });
};

module.exports = Email;