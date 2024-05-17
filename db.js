const mysql = require("mysql");

const dbConn = mysql.createConnection({
  host: "34.101.146.156",
  user: "root",
  password: "",
  database: "ktp-cc",
});

dbConn.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = dbConn;

