const express=require('express');
const app=express();
const bodyParser=require('body-parser');

// use
app.use(bodyParser.urlencoded({extended: true}));
// get
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
// post
app.post('/', function(req, res){
  console.log(req.body);
  let search=req.body.search;
  let city;
  res.send("https://api.openweathermap.org/data/2.5/weather?q="+search+"&units=metric&appid=92508bb004c999c21c0023649232dc59");
  // res.sendFile(__dirname + '/index.html');
});
// listen
app.listen(3000, function(){
  console.log('3000 port connected');
});
