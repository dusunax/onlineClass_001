const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// get -----------------------------------
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});
app.get('/bmicalculator', function(req, res){
  // res.send("<h1>BMI Calculator</h1>"); //어케함
  res.sendFile(__dirname + '/bmiCalculator.html');
});
// post -----------------------------------
app.post('/', function(req, res){
  console.log(req.body);
  let num1=Number(req.body.num1);
  let num2=Number(req.body.num2);
  let result=num1+num2;
  console.log(result);
  res.send('calculation finished, result = '+result);
});
app.post('/bmicalculator', function(req, res){
  let weight=parseFloat(req.body.weight);
  let height=parseFloat(req.body.height)/100;
  let result2=(weight / (height * height)).toFixed(1);
  console.log(weight, height, result2);
  res.send('Your BMI is '+result2);
})
// listen
app.listen(3000, function(){
  console.log('server is running on port 3000');
});
