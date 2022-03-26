//jshint esversion:6

module.exports = "hello world";

// let fooArr = Array.from(document.getElementsByClassName("item"));
// fooArr.forEach((fooo) => {
//   if (fooo !== fooArr[fooArr.length - 1]) {
//     fooo.onclick = itemClick_lavel;
//   };
// });
//
// function itemClick_lavel() {
//   this.children[0].click();
// };
// let td_data = setTodayData();
//
// function postDataSpan(className, currentData) {
//   document.querySelector("." + className).innerHTML = currentData;
// };
//
// function setTodayData() {
//   let testDate = new Date();
//   let options = {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   }
//   let localeDate = testDate.toLocaleDateString('ko-KR', options);
//   let tody = new Date();
//   let currentDate = tody.getDate();
//   let currentDay = tody.getDay();
//   let isWeekend = '평일';
//   switch (currentDay) {
//     case 0:
//       currentDay = "일";
//       isWeekend = '주말';
//       break;
//     case 1:
//       currentDay = "월";
//       break;
//     case 2:
//       currentDay = "화";
//       break;
//     case 3:
//       currentDay = "수";
//       break;
//     case 4:
//       currentDay = "목";
//       break;
//     case 5:
//       currentDay = "금";
//       break;
//     case 6:
//       currentDay = "토";
//       isWeekend = '주말';
//       break;
//     default:
//       console.log('Error: current day is equal to : ' + currentDay);
//   }
//   postDataSpan("isWeekend", isWeekend);
//   postDataSpan("localeDate", localeDate);
//   return;
// }
