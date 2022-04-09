const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://0.0.0.0:27017/test3'
);
mongoose.connection.on('error', (error) => {
  console.error('연결 에러: ', error);
});

// insert - Fruit
// const fruitSchema = new mongoose.Schema ({
//   _id: Number,
//   name: String,
//   rating: Number,
//   review: String
// });
// const Fruit = mongoose.model('Fruit', fruitSchema); // name,  schema
// const fruit = new Fruit({
//   _id: 4,
//   name: 'Small Apple',
//   rating: 6,
//   review: "미니 사과"
// });
// console.log(fruit);
// fruit.save();

// insert - Person
// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });
// const Person = mongoose.model( 'Person', personSchema );
// const person = new Person({
//   name: 'Jane',
//   age: 42
// });
// console.log(person);
// person.save();


// insert many()
const fruitSchema = new mongoose.Schema ({
  _id: Number,
  name: String,
  rating: Number,
  review: String
});
const Fruit = mongoose.model('Fruit', fruitSchema); // name,  schema
// const red = new Fruit({
//   _id: 8,
//   name: 'Red Apple',
//   rating: 8,
//   review: "부사"
// });
// const green = new Fruit({
//   _id: 6,
//   name: 'Green Apple',
//   rating: 8,
//   review: "풋사과"
// });
// const blue = new Fruit({
//   _id: 7,
//   name: 'Blue Apple',
//   rating: 9,
//   review: "민트 사과"
// });
// Fruit.insertMany([ red, green, blue ], function(err, data){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('Apples are good.');
//     console.log(data);
//   }
// })

// find
Fruit.find((err, data)=>{
  if(err){
    console.log(err);
  } else {
    console.log('Apples good.');
    data.forEach((each)=>{
      console.log(each.name);
    });
    mongoose.connection.close();
  };
});
