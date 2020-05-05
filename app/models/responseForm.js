const getConnection = require("./db.js");

// constructor
const ResponseForm = function(responseForm) {
  this.form_completion_date = responseForm.form_completion_date;
  this.acknowledgement = responseForm.acknowledgement;
  this.response = responseForm.response;
  this.vendor_id = responseForm.vendor_id;
};

ResponseForm.create = (newResponseForm, result) => {
  var conn = getConnection();
  conn.query("INSERT INTO response_form SET ?", newResponseForm, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created response form: ", { form_id: parseInt(res.insertId), ...newResponseForm });
    result(null, { form_id: parseInt(res.insertId), ...newResponseForm });
  });
};

ResponseForm.updateById = (form_id, responseForm, result) => {
  var conn = getConnection();
  conn.query(
    "UPDATE response_form SET form_completion_date = ?, acknowledgement = ?, response = ? WHERE form_id = ?",
    [responseForm.form_completion_date, responseForm.acknowledgement, responseForm.response, form_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated response form: ", { form_id: parseInt(form_id), ...responseForm });
      result(null, { form_id: parseInt(form_id), ...responseForm });
    }
  );
};

ResponseForm.access = (form_id, vendor_id, result) => {
  var conn = getConnection();
  conn.query(`SELECT * FROM response_form WHERE form_id = ${form_id} AND vendor_id = ${vendor_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ResponseForm: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ResponseForm with the form_id
    result({ kind: "not_found" }, null);
  });
};

module.exports = ResponseForm;