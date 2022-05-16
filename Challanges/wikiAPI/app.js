// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

// Setting
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect(
  // "mongodb://localhost:27017/wikiDB"
  "mongodb+srv://user1:pass1@cluster0.cw4wk.mongodb.net/wikiDB"
);
const articleSchema = {
  title: {
    type: String,
    required: true
  },
  content: String
}
const Article = mongoose.model("Article", articleSchema);

// articles: get, post, delete
app.route("/articles")
  .get((req, res) => {
    Article.find(function(err, foundArticles) {
      if (err) {
        res.send(err);
      } else {
        console.log("sended a JSON to response.");
        res.send(foundArticles);
      }
    });
  })
.post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save((err) => {
      !err ? res.send("article saved") : res.send(err);
    });
  })
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("successfully deleted all the articles.");
      } else {
        res.send(err);
      }
    });
  });


// Listen
app.listen(3000, (err) => {
  err ? console.log(err) : "";
  console.log("서버 연결: sever started on port 3000");
});

// Back-up document -------------------------------------------------------------------------
/*
  db.articles.insertMany([
    {
        title: "REST",
        content: "REST is short for REpresentational State Transfer. It's an architectural style for designing APIs."
    },
    {
      title : "API",
      content : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
    },
    {
        title : "Bootstrap",
        content : "This is a framework developed by Twitter that contains pre-made front-end templates for web design."
    },
    {
        title : "DOM",
        content : "The Document Object Model is like an API for interacting with our HTML."
    }
  ]);
*/
