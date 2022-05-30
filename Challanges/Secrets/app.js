//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session=require('express-session');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

// settings
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    // userProfileURL: "https://www.google.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.use(session({
  secret: process.env.SECRET,
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

//플러그인
userSchema.plugin(passportLocalMongoose); // new model 전에 플러그인 적용
userSchema.plugin(findOrCreate);

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
  User.register({username: req.body.username}, req.body.password, (err, user)=>{
    if(err){
      console.log(err);
      res.redirect("/register");
    } else {
      console.log("새 회원 등록");
      passport.authenticate("local")(req, res, ()=>{
        res.redirect("/secrets");
      })
    }
  })
});

app.get("/secrets", (req, res)=>{
  if(req.isAuthenticated()){
    console.log("세션확인");
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
        console.log("회원 로그인");
        res.redirect("/secrets");
      })
    }
  })
});

app.get("/logout", (req, res)=>{
  req.logout(()=>{
    console.log("회원 로그아웃");
    res.redirect("/");
  });
})





app.listen(3000, function(){
  console.log("Server started on port 3000");
})
