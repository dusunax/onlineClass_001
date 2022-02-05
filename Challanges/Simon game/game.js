let btnColor = ['cyan', 'magenta', 'yellow', 'black'];
let level = 0;
let rand;
let gamemode = 1;
let randColor = btnColor[rand];
let game_pattern = [];
let userChosenColor;

// 게임진행
$(document).keydown(function() {
  if (event.key == 'Enter') {
    nextSequence();
  }
  if (event.key == '0') {
    gamemode = 2;
    nextSequence();
  }
});
function nextSequence() {
  rand = Math.floor(Math.random() * 4);
  game_pattern.push(rand);
  for (let i = 0; i < game_pattern.length; i++) {
    setTimeout(() => {
      btnPressActive(game_pattern[i]);
      showNextSequence(game_pattern[i]);
    }, i * 500 / gamemode)
  }
  $('.title_top').html(`레벨: ${level++}`)
  console.log(game_pattern);
}
// 버튼클릭
$('.btn').click(function() {
  if(level==0){
    alert('시작하려면 enter키를 눌러주세요.');
    return;
  }
  let userChosenColor = $(this).index();
  btnPressActive(userChosenColor);
  if(userChosenColor == game_pattern[level-1]){
    chooseRight(userChosenColor);
  } else {
    chooseWrong(userChosenColor);
  }
});
function btnPressActive(idx) {
  btnPlaySound(idx);
  $('.btn').eq(idx).css({
    animation: 'none'
  })
}
function showNextSequence(idx) {
  setTimeout(() => {
    $('.btn').eq(idx).css({
      animation: 'btn_click 0.3s'
    })
  }, 100)
}
function chooseRight(idx) {
  setTimeout(() => {
    $('.btn').eq(idx).css({
      animation: 'btn_click 0.3s, btn_right 0.2s'
    })
  }, 100)
}
function chooseWrong(idx) {
  setTimeout(() => {
    $('.btn').eq(idx).css({
      animation: 'btn_click 0.3s, btn_wrong 0.2s'
    })
  }, 100)
  let audio = new Audio(`sounds/wrong.mp3`)
  audio.play();
  gameover();
}
function btnPlaySound(idx) {
  let audio = new Audio(`sounds/${btnColor[idx]}.mp3`)
  audio.play();
}
// 게임오버
function gameover(){
  $('.record').html(level);
  $('.gameover').show();
  $('.restart').click(function(){
    location.reload();
  });
}
