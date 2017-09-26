var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");
var port = process.env.PORT || 3000;
var app = express();

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/alvaroapp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/login", (req, res) => {
  if(req.body.password === "19961996") {
    res.redirect("/alvaro");
  } else {
    res.redirect("/");
  }
})

app.get("/alvaro", (req, res) => {
  res.render("content");
});

app.listen(port, () => {
  console.log("server started");
});
