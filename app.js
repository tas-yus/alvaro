var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");
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

var user = [
    {
        username: "Alvaro"
    }
]

User.remove({}, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Alvaro Removed");
  User.register(user[0], "19961996", (err, user) => {
    if (err) {
        return console.log(err);
    }
    console.log("Alvaro Added");
  });
})

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/alvaro",
        failureRedirect: "/"
    }),(req, res) => {
});

app.get("/alvaro", (req, res) => {
  res.render("content");
});

app.listen(3000, () => {
  console.log("server started");
});
