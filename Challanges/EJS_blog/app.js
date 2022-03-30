//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// set
app.set('view engine', 'ejs');

// use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let postArr=[
  {title:'post one', body: '11.psoloremtsdpellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum f'},
  {title:'post two', body: '22.psotspellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum df'}
];

// get
app.get('/', function(req, res){
  res.render( 'home', {
    homeStartingContent: homeStartingContent,
    posts: postArr
  });
});
app.get('/about', function(req, res){
  res.render(
    'about', { aboutContent: aboutContent }
  );
});
app.get('/contact', function(req, res){
  res.render(
    'contact', { contactContent: contactContent }
  );
});
app.get('/compose', function(req, res){
  res.render(
    'compose', { currentPage: 'compose',  userAlerts: '' }
  );
});
app.get('/post/:postID', function(req, res){
  let reqPostTitle=_.lowerCase(req.params.postID);
  let match=false;
  postArr.forEach((post)=>{
    let savedPostTitle=_.lowerCase(post.title);
    if(savedPostTitle == reqPostTitle){
      res.render(
        'post', { postTitle: post.title, postBody: post.body }
      );
      match=true;
    }
  });
  if(!match){
      res.render(
        'post', { postTitle: '게시물을 찾을 수 없습니다.', postBody: '다른 페이지를 이용해주세용:p' }
      );
  }
});

// post
app.post('/', function(req, res){
  if(req.body.page === 'compose'){
    const post={
      title: req.body.newTitle, body: req.body.newPost
    }
    postArr.unshift(post);
    res.redirect('/');
    // res.render(
      //   'compose', { currentPage: 'compose',  userAlerts: 'post완료' }
      // );
  } else {
    res.redirect('/');
  }
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
