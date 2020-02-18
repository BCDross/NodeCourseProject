var express = require("express");
var path = require("path");

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require("body-parser");

var app = express();

// view engine setup
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.dataArray = [];

// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page
app.get("/", function(req, res) {
  res.render("pages/index");
});

// about page
app.get("/about", function(req, res) {
  res.render("pages/about");
});

app.get("/allBooks", function(req, res) {
  dataArray = app.dataArray;
  res.render("pages/allBooks", {
    dataArray: app.dataArray
  });
});
module.exports = app;