const getConnection = require("./db.js");

// constructor
const Violation = function(violation) {
  this.violation_date = violation.violation_date;
  this.url = violation.url;
  this.title = violation.title;
  this.investigator_id = violation.investigator_id;
  this.recall_id = violation.recall_id;
  this.violation_status = violation.violation_status;
};

Violation.create = (newViolation, result) => {
  var conn = getConnection();
  conn.query("INSERT INTO Violation SET ?", newViolation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created violation: ", { violation_id: parseInt(res.insertId), ...newViolation });
    result(null, { violation_id: parseInt(res.insertId), ...newViolation });
  });
};

Violation.findById = (violation_id, result) => {
  var conn = getConnection();
  conn.query(`SELECT * FROM Violation WHERE violation_id = ${violation_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found violation: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Violation with the violation_id
    result({ kind: "not_found" }, null);
  });
};

Violation.search = (violation_status, result) => {
  var conn = getConnection();
  statusQuery = (status) => {
    if (status == "") {
      return "";
    }
    return ` AND violation_status = '${status}'`;
  };

  conn.query(`SELECT * FROM Violation WHERE 1=1${statusQuery(violation_status)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("violations: ", res);
    result(null, res);
  });
};

Violation.updateById = (violation_id, violation, result) => {
  var conn = getConnection();
  conn.query(
    "UPDATE Violation SET url = ?, title = ?, investigator_id = ?, recall_id = ?, violation_status = ? WHERE violation_id = ?",
    [violation.url, violation.title, violation.investigator_id, violation.recall_id, violation.violation_status, violation_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Violation with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated violation: ", { violation_id: parseInt(violation_id), ...violation });
      result(null, { violation_id: parseInt(violation_id), ...violation });
    }
  );
};

Violation.remove = (violation_id, result) => {
  var conn = getConnection();
  conn.query("DELETE FROM Violation WHERE violation_id = ?", violation_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Violation with the violation_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted violation with violation_id: ", violation_id);
    result(null, res);
  });
};

Violation.removeAll = result => {
  var conn = getConnection();
  conn.query("DELETE FROM Violation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} violations`);
    result(null, res);
  });
};

module.exports = Violation;