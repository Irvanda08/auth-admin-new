const dbConn = require("../db");
const bcrypt = require('bcrypt');

const Admin = function (admin) {
  this.username = admin.username;
  this.password = admin.password;
};

Admin.create = (newAdmin, result) => {
  // Hash the password before saving it to the database
  bcrypt.hash(newAdmin.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      newAdmin.password = hashedPassword;
      dbConn.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      });
    }
  });
};

Admin.findById = (username, result) => {
  dbConn.query("SELECT * FROM admin WHERE username = ?", [username], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Admin.findAll = (result) => {
  dbConn.query("SELECT * FROM admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Admin.update = (username, admin, result) => {
  // Hash the password before updating it in the database
  bcrypt.hash(admin.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      dbConn.query(
        "UPDATE admin SET password=? WHERE username = ?",
        [hashedPassword, username],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            result(null, res);
          }
        }
      );
    }
  });
};

Admin.delete = (username, result) => {
  dbConn.query("DELETE FROM admin WHERE username = ?", [username], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Admin;
