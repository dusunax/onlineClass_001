const express = require('express');
const app = express();

app.get('/', function(req, res){
  console.log(req);
  res.send('<h1>Hello, world!</h1>')
});
app.get('/contact', function(req, res){ //get마다 각 매개변수 챙기기
  res.send('contact me at: ~~');
});
app.get('/about', function(req, res){
  res.send('myself~~~~');
});
app.listen(3000, function(){
  console.log('server started on port 3000');
});
