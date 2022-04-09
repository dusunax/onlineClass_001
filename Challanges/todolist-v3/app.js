//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://0.0.0.0:27017/toDoList_v3'
);
mongoose.connection.on('error', (error) => {
  console.error('DB연결 에러: ', error);
});

// DB 몽구스
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
const Item = mongoose.model('Item', itemSchema);
const item = new Item({
  name: '새로운 이름'
});
item.save();
// Item.insertOne(item, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('아이템 입력 완료: '+item);
//   }
// })

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
