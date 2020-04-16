const sql = require("./db.js");

// constructor
const Recall = function(recall) {
  this.recall_number = recall.recall_number;
  this.high_priority = recall.high_priority
  this.date = recall.date;
  this.recall_heading = recall.recall_heading;
  this.name_of_product = recall.name_of_product;
  this.description = recall.description;
  this.hazard = recall.hazard;
  this.remedy_type = recall.remedy_type;
  this.units = recall.units;
  this.conjunction_with = recall.conjunction_with;
  this.incidents = recall.incidents;
  this.remedy = recall.remedy;
  this.sold_at = recall.sold_at;
  this.distributors = recall.distributors;
  this.manufactured_in = recall.manufactured_in;
};

Recall.create = (newRecall, result) => {
  sql.query("INSERT INTO fullrecallapi SET ?", newRecall, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created recall: ", { recall_id: parseInt(res.insertId), ...newRecall });
    result(null, { recall_id: parseInt(res.insertId), ...newRecall });
  });
};

Recall.findById = (recall_id, result) => {
  sql.query(`SELECT * FROM fullrecallapi WHERE recall_id = ${recall_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found recall: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Recall with the recall_id
    result({ kind: "not_found" }, null);
  });
};

Recall.search = (search, sort_by, limit, offset, result) => {
  searchQuery = (search) => {
      if (search == "") {
        return "";
      } else {
        return ` AND description LIKE '%${search}%'`; 
      }
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

  sql.query(`SELECT * FROM fullrecallapi WHERE 1=1${searchQuery(search)}${sortByQuery(sort_by)}${limitQuery(limit, offset)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("recalls: ", res);
    result(null, res);
  });
};

Recall.updateById = (recall_id, recall, result) => {
  sql.query(
    "UPDATE fullrecallapi SET recall_number = ?, `high_priority` = ?, date = ?, recall_heading = ?, name_of_product = ?, description = ?, hazard = ?, remedy_type = ?, units = ?, conjunction_with = ?, incidents = ?, remedy = ?, sold_at = ?, distributors = ?, manufactured_in = ? WHERE recall_id = ?",
    [recall.recall_number, recall.high_priority, recall.date, recall.recall_heading, recall.name_of_product, recall.description, recall.hazard, recall.remedy_type, recall.units, recall.conjunction_with, recall.incidents, recall.remedy,recall.sold_at, recall.distributors, recall.manufactured_in, recall_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Recall with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated recall: ", { recall_id: parseInt(recall_id), ...recall });
      result(null, { recall_id: parseInt(recall_id), ...recall });
    }
  );
};

Recall.remove = (recall_id, result) => {
  sql.query("DELETE FROM fullrecallapi WHERE recall_id = ?", recall_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Recall with the recall_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted recall with recall_id: ", recall_id);
    result(null, res);
  });
};

Recall.removeAll = result => {
  sql.query("DELETE FROM fullrecallapi", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} recalls`);
    result(null, res);
  });
};

module.exports = Recall;