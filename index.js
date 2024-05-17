const express = require("express");
const bodyParser = require("body-parser");
const ticketRoutes = require("./routes/dataRoutes");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("", ticketRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
