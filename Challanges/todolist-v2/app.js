//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
let items=['11', '22'];
let workItems=[];

// use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// set
app.set('view engine', 'ejs');

// get
app.get('/', function(req, res){
  let dateObject = date.dateObject();
  res.render('list', {
    listName: 'main',
    listTitle: '기본 리스트1',
    listItems: items,
    dateObject: dateObject
  });
});
app.get('/work', function(req, res){
  let dateObject = date.dateObject();
  res.render('list', {
    listName: 'work',
    listTitle: '할일 리스트2',
    listItems: workItems,
    dateObject: dateObject
  });
});
app.get('/about', function(req, res){
  res.render('about')
})

// post
app.post('/', function(req, res){
  let item=req.body.newList;
  if(req.body.listName == "work"){
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});
// app.post('/work', function(req, res){
//   let item=req.body.newList;
//   res.redirect('/work');
//
//   console.log(req.body);
// });

// listen
app.listen(3000,  function(){
  console.log('Sever started on port 3000');
});
