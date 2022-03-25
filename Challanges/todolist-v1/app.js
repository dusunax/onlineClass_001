//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let items=[];

// use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// set
app.set('view engine', 'ejs');

// get
app.get('/', function(req, res){
  // res.send('hello');

  // use write & send
  // res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  // const daysKo = ['일', '월', '화', '수', '목', '금', '토'];
  // let tody = new Date();
  // let currentDay = daysKo[tody.getDay()];
  // res.write('오늘은<br>'+ tody.getDate() + '일 ' + currentDay + '요일<br>');
  //
  // if (currentDay == 6 || currentDay == 0){
  //   res.write(' 주말');
  // } else {
  //   res.write(' 평일');
  // }
  // res.write('입니다.');
  // res.send();

  let testDate = new Date();
  let options={
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  let localeDate = testDate.toLocaleDateString('ko-KR', options);
  // console.log(testDate.toLocaleDateString('en-US'));
  // console.log(testDate.toLocaleDateString('ko-KR', options));

  // use EJS
  // const daysKo = ['일', '월', '화', '수', '목', '금', '토'];
  // let tody = new Date();
  // let currentDate = tody.getDate();
  // let currentDay = daysKo[tody.getDay()];
  // let isWeekend = '평일';
  // if (currentDay == 6 || currentDay == 0){
  //   isWeekend = '주말'
  // };
  // use switch
  let tody = new Date();
  let currentDate = tody.getDate();
  let currentDay = tody.getDay();
  let isWeekend='평일';
  switch(currentDay){
    case 0:
      currentDay = "일";
      isWeekend = '주말';
      break;
    case 1:
      currentDay = "월";
      break;
    case 2:
      currentDay = "화";
      break;
    case 3:
      currentDay = "수";
      break;
    case 4:
      currentDay = "목";
      break;
    case 5:
      currentDay = "금";
      break;
    case 6:
      currentDay = "토";
      isWeekend = '주말';
      break;
    default:
      console.log('Error: current day is equal to : ' + currentDay);
  }
  res.render('list', {
    currentDate: currentDate,
    currentDay: currentDay,
    isWeekend: isWeekend,

    localeDate: localeDate,
    items: items
  });
});
app.post('/', function(req, res){
  let item=req.body.newList;
  items.push(item);
  res.redirect('/');
  // res.send('post completed : '+data);
});

// listen
app.listen(3000,  function(){
  console.log('Sever started on port 3000');
});
