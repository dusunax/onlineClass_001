// # modules require
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://0.0.0.0:27017/test3'
);
mongoose.connection.on('error', (error) => {
  console.error('연결 에러: ', error);
});

// # 자료구조 => 스키마 정의, 모델 선언
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
    minLength: 0,
    maxLength: [50, '50자 이내로 입력하세요.']
  }
});
const Fruit = mongoose.model('Fruit', fruitSchema);
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: [1, 'age between 1~150'],
    max: [150, 'age between 1~150']
  },
  favouritefruit: fruitSchema
});
const Person = mongoose.model('person', personSchema);

// # 값 설정 여기
const fruit = new Fruit({
  _id: 11,
  name: 'Calm Apple',
  rating: 8,
  review: "언제나 평정심을 유지하는 요가마스터 사과"
});
const person = new Person({
  name: 'John',
  age: '14',
  favouritefruit: fruit
});

// # 명령 1: 과일입력
Fruit.insertMany([ fruit ], function(err, data){
  if(err){
    console.log("입력 에러"+err);
  } else {
    console.log('New data insert completed.');
    // console.log(data);
  }
});

// # 명령 2: 사람입력
// person.save((err)=>{
//   if(err){
//     console.log(err);
//   } else {
//     console.log('새 사람')
//   }
// });

// # 수정하기
// Person.updateOne({'name': 'Jane'}, {favouritefruit: fruit}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('수정 완료!');
// }
// });

// # 삭제 여기서
// Fruit.deleteOne({_id: 10}, function(err, data){
//   if(err){
//     console.log("명령 에러"+err);
//   } else {
//     console.log("deleted");
//   }
// });

// # 전체 확인 find
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
