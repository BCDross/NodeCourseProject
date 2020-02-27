const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/themes/Prog209ThemeRolled.min.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/themes/Prog209ThemeRolled.min.css'));
});

app.get('/themes/jquery.mobile.icons.min.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/themes/jquery.mobile.icons.min.css'));
});

module.exports = app;