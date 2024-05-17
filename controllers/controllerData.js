const Data = require("../models/dataModel");

exports.findAll = (req, res) => {
  Data.findAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  const newData = new Data(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Please provide all required fields" });
  } else {
    Data.create(newData, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error creating data" });
      } else {
        res.json({ message: "Data added successfully", data });
      }
    });
  }
};

exports.findById = (req, res) => {
  Data.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res) => {
  const newData = new Data(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Please provide all required fields" });
  } else {
    Data.update(req.params.id, newData, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error updating data" });
      } else {
        res.json({ message: "Data updated successfully" });
      }
    });
  }
};

exports.delete = (req, res) => {
  Data.delete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error deleting data" });
    } else {
      res.json({ message: "Data deleted successfully" });
    }
  });
};