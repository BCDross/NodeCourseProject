const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = app;