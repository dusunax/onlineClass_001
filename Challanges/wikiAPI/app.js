// jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const app=express();

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
  title: { type: String, required: true },
  content: String
}
const Article = mongoose.model("Article", articleSchema);

// Get
app.get("/", (err)=>{

})

// Listen
app.listen(3000, (err)=>{
  err?console.log(err):"";
  console.log("sever started on port 3000");
})


// Document
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
