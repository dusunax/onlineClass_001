const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');

// use
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
// get
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
// post
app.post('/', function(req, res) {
  // key & url
  const query = req.body.cityname;
  const apiKey = '92508bb004c999c21c0023649232dc59';
  const unit = 'metric';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=' + unit + '&appid=' + apiKey;

  // https
  https.get(url, function(http_res) {
    console.log(url);
    // console.log(http_res.statusCode); // 200
    http_res.on('data', function(data) {
      // console.log(data); // hexadecimal code
      const weatherData = JSON.parse(data); // data=(JSON)=>Object
      const name = weatherData.name;
      const weather = weatherData.weather[0].main;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imgURL ='http://openweathermap.org/img/wn/'+icon+'@2x.png'

      res.send(`
                  <h2 class="name">${name}</h2>
                  <p class="weather">${weather}</p>
                  <h1 class="temperture"><span>${temp}</span>℃</h1>
                  </div>
                  <img src="${imgURL}" alt="맑음" class="weather_img">
                  <div class="shader"></div>
                `);

      // res.sendFile(__dirname + '/index.html');
      // append_cityInfo({
      //   name: name,
      //   weather: weather,
      //   temp: temp,
      //   imgURL: imgURL
      // });

      // res.writeHead(200, {
      //   'Content-Type': 'text/html;charset=UTF-8'
      // });
      // res.write(`
      //           <h1><strong>${weatherData.name}</strong>의 날씨는, ${weatherData.weather[0].main}</h1>
      //           <h2>온도는 ${weatherData.main.temp}도 입니다.</h2>
      //         `);
      // res.write(`
      //           <img src="${imgURL}" alt="" class="weather_img">
      //           `)
      // res.send();
    });
  });
});
// listen
app.listen(3000, function() {
  console.log('Server is running on port 3000.');
});



// ------------------------------------------------------------------------------
// document.
function append_cityInfo(name, weather, temp, imgURL){
  let cityInfo = `
                  <h2 class="name">${name}</h2>
                  <p class="weather">${weather}</p>
                  <h1 class="temperture"><span>${temp}</span>℃</h1>
                  </div>
                  <img src="${imgURL}" alt="맑음" class="weather_img">
                  <div class="shader"></div>
                `
}
