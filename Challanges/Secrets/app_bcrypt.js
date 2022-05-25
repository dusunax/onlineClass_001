//jshint esversion:6
require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// settings
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect("mongodb://127.0.0.1:27017/userDB");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = new mongoose.model("User", userSchema);

// route
app.get("/", (req, res)=>{
  res.render("home");
});

app.route("/register")
.get((req, res)=>{
  res.render("register");
})
.post((req, res)=>{
  bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save((err)=>{
      !err?res.render("secrets"):console.log(err);
    })
  })
});

app.route("/login")
.get((req, res)=>{
  res.render("login");
})
.post((req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, (err, foundUser)=>{
    if(err){
      console.log(err);
    } else {
      if(foundUser){
        bcrypt.compare(password, foundUser.password, (err, result)=>{
          if(result === true){
            res.render("secrets");
          }
        });
      }
    }
  });
});







app.listen(3000, function(){
  console.log("Server started on port 3000");
})
