const getConnection = require("./db.js");

// constructor
const Violation = function(violation) {
  this.violation_date = violation.violation_date;
  this.url = violation.url;
  this.title = violation.title;
  this.screenshot_file = violation.screenshot_file;
  this.investigator_id = violation.investigator_id;
  this.vendor_id = violation.vendor_id;
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

Violation.search = (search, violation_status, sort_by, limit, offset, result) => {
  var conn = getConnection();

  searchQuery = (search) => {
    if (search == "") {
      return "";
    } else {
      return ` AND title LIKE '%${search}%'`; 
    }
  };

  statusQuery = (status) => {
    if (status == "") {
      return "";
    }
    return ` AND violation_status = '${status}'`;
  };

  sortByQuery = (sort_by) => {
    if (sort_by == "") {
      return "";
    }
    if (sort_by == "high_priority") {
      return ` AND \`${sort_by}\` = b'1'`; 
    }
    return ` ORDER BY \`${sort_by}\` DESC`; 
  };

  limitQuery = (limit, offset) => {
    if (limit == "") {
      return "";
    }
    if (offset == "") {
      return ` LIMIT ${limit}`;
    }
    return ` LIMIT ${limit}, ${offset}`;
  };

  conn.query(`SELECT * FROM Violation WHERE 1=1${searchQuery(search)}${statusQuery(violation_status)}${sortByQuery(sort_by)}${limitQuery(limit, offset)}`, (err, res) => {
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
    "UPDATE Violation SET url = ?, title = ?, screenshot_file = ?, investigator_id = ?, vendor_id = ?, recall_id = ?, violation_status = ? WHERE violation_id = ?",
    [violation.url, violation.title, violation.screenshot_file, violation.investigator_id, violation.vendor_id, violation.recall_id, violation.violation_status, violation_id],
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