//jshint esversion:6
require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session=require('express-session');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');

// settings
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({                   // session
  secret: "nosecretsareforever.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());      // passport
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB");
const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
});
userSchema.plugin(passportLocalMongoose); // new model 전에 플러그인 적용
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// route
app.get("/", (req, res)=>{
  res.render("home");
});

app.route("/register")
.get((req, res)=>{
  res.render("register");
})
.post((req, res)=>{
  console.log("here");
  User.register({username: req.body.username}, req.body.password, (err, user)=>{
    if(err){
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, ()=>{
        res.redirect("/secrets");
      })
    }
  })
});

app.get("/secrets", (req, res)=>{
  if(req.isAuthenticated()){
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.route("/login")
.get((req, res)=>{
  if(req.isAuthenticated()){
    res.render("secrets");
  } else {
    res.render("login");
  };
})
.post((req, res)=>{
  const user=new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, (err)=>{
    if(err){
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, ()=>{
        res.redirect("/secrets");
      })
    }
  })
});

app.get("/logout", (req, res)=>{
  req.logout(()=>{
    res.redirect("/");
  });
})





app.listen(3000, function(){
  console.log("Server started on port 3000");
})
