const dbConn = require("../db");

const Data = function (data) {
  this.nama = data.nama;
  this.tanggal_lahir = data.tanggal_lahir;
  this.agama = data.agama;
  this.status = data.status;
  this.alamat = data.alamat;
};

Data.create = (newData, result) => {
  dbConn.query("INSERT INTO data SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Data.findById = (id, result) => {
  dbConn.query("SELECT * FROM data WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Data.findAll = (result) => {
  dbConn.query("SELECT * FROM data", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Data.update = (id, data, result) => {
  dbConn.query(
    "UPDATE data SET nama=?, tanggal_lahir=?, agama=?, status=?, alamat=? WHERE id = ?",
    [data.nama, data.tanggal_lahir, data.agama, data.status, data.alamat, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Data.delete = (id, result) => {
  dbConn.query("DELETE FROM data WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Data;