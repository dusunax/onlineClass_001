const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://0.0.0.0:27017/test3'
);
mongoose.connection.on('error', (error) => {
  console.error('연결 에러: ', error);
});

// 자료구조 => 스키마 정의, 모델 선언
const fruitSchema = new mongoose.Schema ({
  _id: Number, // inc_field
  name: {
    type: String,
    required: [true, 'you need name.']
  },
  rating: {
    type: Number,
    min: [1, "rating is must be between 1~10"],
    max: [10, "rating is must be between 1~10"],
    required: true
  },
  review: {
    type: String,
    max: [50, '50자 이내로 입력하세요.']
  }
});
const Fruit = mongoose.model('Fruit', fruitSchema);

// insert
const fruit = new Fruit({
  _id: 10,
  name: 'Bug Apple',
  rating: 10,
  review: "오류나는 맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛맛"
});

Fruit.insertMany([ fruit ], function(err, data){
  if(err){
    console.log("입력 에러"+err);
  } else {
    console.log('New data insert completed.');
    // console.log(data);
  }
})

// Fruit.deleteOne({_id: 10}, function(err, data){
//   if(err){
//     console.log("명령 에러"+err);
//   } else {
//     console.log("deleted");
//   }
// });

// find
// Fruit.find((err, data)=>{
//   if(err){
//     console.log(err);
//   } else {
//     console.log('Apples good.');
//     data.forEach((each)=>{
//       console.log(each.name);
//       // console.log(each);
//     });
//     mongoose.connection.close();
//   };
// });
