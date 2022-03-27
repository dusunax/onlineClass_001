//jshint esversion:6
module.exports.dateObject = function(){
  let td=new Date();
  let isWeekend = isItWeekend(td.getDay());
  let result_object = {
    localDate: td.toLocaleDateString('ko-KR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }),
    currentDate: td.getDate(),
    currentDay: isWeekend.currentDay,
    isWeekend: isWeekend.isWeekend
  }
  return result_object;
}

// 함슈
function isItWeekend(currentDay){
  let isWeekend = '평일';
  switch (currentDay) {
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
  return {currentDay: currentDay, isWeekend: isWeekend};
}
