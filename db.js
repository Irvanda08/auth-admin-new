const mysql = require("mysql");

const dbConn = mysql.createConnection({
  host: "34.101.146.156",
  user: "root",
  password: "",
  database: "RECOVER_YOUR_DATA",
});

dbConn.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = dbConn;

