const sql = require("./db.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.first_name = user.first_name;
  this.user_type = user.user_type;
};

User.create = (newUser, result) => {
  var conn = sql.getConnection();
  conn.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { user_id: parseInt(res.insertId), ...newUser });
    result(null, { user_id: parseInt(res.insertId), ...newUser });
  });
};

User.findById = (user_id, result) => {
  var conn = sql.getConnection();
  conn.query(`SELECT * FROM user WHERE user_id = ${user_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the user_id
    result({ kind: "not_found" }, null);
  });
};

User.login = (email, password, result) => {
  var conn = sql.getConnection();
  conn.query(`SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }

  if (res.length) {
    console.log("found user: ", res[0]);
    result(null, res[0]);
    return;
  }

  // not found User with the user_id
  result({ kind: "not_found" }, null);
});
}

User.getAll = result => {
  var conn = sql.getConnection();
  conn.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (user_id, user, result) => {
  var conn = sql.getConnection();
  conn.query(
    "UPDATE user SET email = ?, password = ?, first_name = ?, user_type = ? WHERE user_id = ?",
    [user.email, user.password, user.first_name, user.user_type, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { user_id: parseInt(user_id), ...user });
      result(null, { user_id: parseInt(user_id), ...user });
    }
  );
};

User.remove = (user_id, result) => {
  var conn = sql.getConnection();
  conn.query("DELETE FROM user WHERE user_id = ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the user_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with user_id: ", user_id);
    result(null, res);
  });
};

User.removeAll = result => {
  var conn = sql.getConnection();
  conn.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;