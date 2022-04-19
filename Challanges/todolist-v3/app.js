//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

// mongoose.connect(
//   'mongodb://0.0.0.0:27017/toDoList_v3'
// );
mongoose.connect(
  "mongodb+srv://user1:pass1@cluster0.cw4wk.mongodb.net/testUserDB"
);

// DB 몽구스
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
const Item = mongoose.model('Item', itemSchema);
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});
const List = mongoose.model('List', listSchema);

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
app.get("/:customListName", function(req, res){
  const customListName=_.capitalize(req.params.customListName);
  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        console.log("New Data-List created.");
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/"+customListName)
      } else{
        console.log("print "+ foundList.name);
        res.render('list', {
          listTitle: foundList.name,
          listName: 'dodo',
          listItems: foundList.items
        });
      };
    };
  });
})

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
  let listName=req.body.list;
  const newItem = new Item({
    name: itemName
  });
  if(listName === "today"){
    newItem.save();
    res.redirect("/");
  } else {
    console.log(listName);
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res){
  const chkedId = req.body.chk_box;
  const listName = req.body.listName;

  if(listName === "today"){
     Item.findByIdAndRemove(chkedId, function(){});
    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      {name: listName},
      {$pull: { items: { _id: chkedId }}},
      function(err, result){
        if(!err){
          res.redirect("/"+listName);
        }
      }
    )
  }
});

// listen
let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000
};
app.listen(port, function(){
  console.log('Sever started successfully.');
});
