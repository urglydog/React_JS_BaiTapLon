"use strict";

var _connectDB = _interopRequireDefault(require("./config/connectDB"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _connectDB["default"])();
require("dotenv").config();
var express = require("express");
var app = express();

// Middleware cơ bản
app.use(express.json());

// Route chính
app.get("/", function (req, res) {
  res.send("Welcome to My Node.js Project!");
});

// Lắng nghe trên cổng
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});