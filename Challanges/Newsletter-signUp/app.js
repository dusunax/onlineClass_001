const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const https=require('https');
// use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
// get
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
// post
app.post("/", function(req, res){
  console.log('posted complate');
  const name=req.body.name;
  const nickname=req.body.nickname;
  const email=req.body.email;
  console.log(name, nickname, email);

  const data ={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_field: {
          FNAME: name,
          NNAME: nickname
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url='https://us14.api.mailchimp.com/3.0/lists/ee6159574b' // endpoint + optional path
  const options= {
    method: 'POST',
    auth: "meme:e83e23dc566f144d16df76f4c24eabe7-us14"
  }
  const request=https.request(url, options, function(response){
    response.on('data', function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
// listen
app.listen(3000, function(){
  console.log('sever is running on port 3000');
});

// e83e23dc566f144d16df76f4c24eabe7-us14
// ee6159574b
