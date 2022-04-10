//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

// # 입력
const item1 = new Item({
  name: '+버튼을 눌러 추가하세요.'
});
const item2 = new Item({
  name: '완료한 리스트를 클릭해 체크하세요.'
});
const item3 = new Item({
  name: 'to-do리스트입니다.'
});
const defaultItems=[item1, item2, item3];

// use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// set
app.set('view engine', 'ejs');

// get
app.get('/', function(req, res){
  Item.find((err, foundItems)=>{
    // console.log(foundItems);
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){ console.log(err);} else {
          console.log("Printing default items");
        };
      });
      res.redirect("/");
    } else {
      res.render('list', {
        listTitle: 'today',
        listName: 'dodo',
        listItems: foundItems
      });
    };
  });
});

// post
app.post('/', function(req, res){
  let itemName=req.body.newListItem;
  const newItem = new Item({
    name: itemName
  });
  newItem.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
  // console.log(req.body.chk_box);
  const chkedId = req.body.chk_box;
  Item.findByIdAndRemove(chkedId, function(err){
    if(err){}
  });
  res.redirect("/");
});

// listen
app.listen(3000,  function(){
  console.log('Sever started on port 3000');
});
