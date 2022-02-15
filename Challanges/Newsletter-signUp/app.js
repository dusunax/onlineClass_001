const express=require('express');
const app=express();
const bodyParser=require('body-parser');

// use
app.use(bodyParser.urlencoded({extended: true}));
// get
app.get("/", function(req, res){
  res.send("Hello, world!");
});
// post
app.post("/", function(req, res){
  console.log('posted complate');
});
// listen
app.listen(3000, function(){
  console.log('sever running on port 3000');
});
