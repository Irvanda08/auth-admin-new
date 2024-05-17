// middleware/auth.js
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
