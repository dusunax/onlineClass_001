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
const KakaoStrategy = require('passport-kakao').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

// settings
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


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
  },
  googleId: String,
  kakaoId: String,
  githubId: String,
  secretList: [
    {
      secret: String
    }
  ]
});

//플러그인
userSchema.plugin(passportLocalMongoose); // new model 전에 플러그인 적용
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser((user, done)=>{
  done(null, user.id);
});
passport.deserializeUser((id, done)=>{
  User.findById(id, (err, user)=>{
    done(err, user);
  })
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile); // 구글 로그인 정보

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log("구글연동 아이디:");
      console.log(profile.displayName);
      console.log(profile.name.familyName, profile.name.givenName);
      console.log(user);
      return cb(err, user);
    });
  }
));
passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/kakao/secrets",
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);

    User.findOrCreate({ kakaoId: profile.id }, (err, user)=>{
      console.log("카카오연동 아이디:");
      console.log(user);
      if(err){return done(err)}
      return done(null, user)
    });
  }
));
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:3000/auth/github/secrets",
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("깃헙연동 아이디:");
    console.log(profile);
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


// route
app.get("/", (req, res)=>{
  res.render("home");
});

// 구글
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get("/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/secrets");
  }
);
// 카카오
app.get( "/auth/kakao",
  passport.authenticate('kakao', { failureRedirect: '/login' })
)
app.get("/auth/kakao/secrets",
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/secrets");
  }
);
// 깃헙
app.get('/auth/github',
  passport.authenticate('github'));
app.get("/auth/github/secrets",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/secrets");
  }
);

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

app.get("/secrets", (req, res)=>{
  if(req.isAuthenticated()){
    User.find({ "secretList" : {$ne : null} }, (err, found)=>{
      if(err){ console.log(err) } else {
        if(found){
          res.render("secrets", {usersWithSecrets: found});
        }
      };
    });
  } else {
    res.redirect("/login");
  }
});

app.route("/submit")
.get((req, res)=>{
  if(req.isAuthenticated()){
    res.render("submit");
  } else {
    res.redirect("/login");
  }
})
.post((req, res)=>{
  const newSubmit={
    secret: req.body.secret
  };
  User.findById(req.user._id, (err, found)=>{
    if(err){
      console.log(err);
    } else {
      found.secretList.push(newSubmit);
      found.save(()=>{
        User.find({ "secretList" : {$ne : null} }, (err, found)=>{
          if(err){ console.log(err) } else {
            if(found){
              res.render("secrets", {usersWithSecrets: found});
            }
          };
        });
      })
    }
  })
});

let port=(process.env.PORT == null || process.env.PORT == "")?3000:process.env.PORT;
app.listen(port, function(){
  console.log("Server started on port"+port);
})
