const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://0.0.0.0:27017/test3'
);
mongoose.connection.on('error', (error) => {
  console.error('연결 에러: ', error);
});

// insert
const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});
const Fruit = mongoose.model('Fruit', fruitSchema); // name,  schema
const fruit = new Fruit({
  name: 'light Apple',
  rating: 8,
  review: "경량 사과"
});
console.log(fruit);
fruit.save();
