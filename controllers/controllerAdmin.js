const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require("../models/adminModel");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  Admin.findById(username, async (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Error fetching data" });
    }

    if (!data || data.length === 0) {
      return res.status(404).send({ message: "Admin not found" });
    }

    try {
      const isMatch = await bcrypt.compare(password, data[0].password);
      if (isMatch) {
        const token = jwt.sign({ username: data[0].username }, 'secretkey');
        return res.status(200).send({ message: "Login successful", token });
      } else {
        return res.status(401).send({ message: "Incorrect password" });
      }
    } catch (error) {
      return res.status(500).send({ message: "Error during authentication" });
    }
  });
};

exports.findById = (req, res) => {
  Admin.findById(req.params.username, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else if (!data || data.length === 0) {
      res.status(404).send({ message: "Admin not found" });
    } else {
      res.json(data[0]);
    }
  });
};

exports.create = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Please provide all required fields" });
  }

  try {
    // Check if the username already exists
    Admin.findById(username, async (err, data) => {
      if (err) {
        return res.status(500).send({ message: "Error fetching data" });
      }

      if (data.length > 0) {
        return res.status(400).send({ message: "Username already exists" });
      }

      const newAdmin = new Admin({ username, password });

      // Create the new admin
      Admin.create(newAdmin, (err, data) => {
        if (err) {
          return res.status(500).send({ message: "Error creating data" });
        } else {
          return res.json({ message: "Admin added successfully", data });
        }
      });
    });
  } catch (error) {
    return res.status(500).send({ message: "Error creating data" });
  }
};

exports.findAll = (req, res) => {
  Admin.findAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching data" });
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  Admin.delete(req.params.username, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error deleting data" });
    } else if (data.affectedRows === 0) {
      res.status(404).send({ message: "Admin not found" });
    } else {
      res.json({ message: "Admin deleted successfully" });
    }
  });
};
