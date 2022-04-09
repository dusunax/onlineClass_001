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
const item = new Item({
  name: '아이템'
});
const item1 = new Item({
  name: '+버튼을 눌러 추가하세요.'
});
const item2 = new Item({
  name: '완료한 리스트를 클릭해 체크하세요.'
});
const item3 = new Item({
  name: 'to-do리스트입니다.'
});

// # 입력 여기서
// item.save();
// Item.insertMany([item3, item1, item2], function(err){
//   if(err){ console.log(err); } else {
//     console.log("여러개 입력 완료");
//   }
// })

// # 전체삭제 empty collection
// Item.deleteMany({}, function(){
//   console.log("삭제완료");
// });

// # 전체검색
let items;
Item.find((err, result)=>{
  items=result;
  console.log(items);
})

//////////////////////////////////////////////////////////////////////////////
// use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// set
app.set('view engine', 'ejs');

// get
app.get('/', function(req, res){
  res.render('list', {
    listTitle: 'today',
    listName: 'dodo',
    listItems: items
  });
});

// post
app.post('/', function(req, res){
  // let item=req.body.newList;
  // items.push(item);
});

// listen
app.listen(3000,  function(){
  console.log('Sever started on port 3000');
});
