document.addEventListener("DOMContentLoaded", function() {
  const btn_stop = document.querySelector(".btn_stop");
  const btn_start = document.querySelector(".btn_start");
  const lottie_box = document.getElementById('lottie');
  let myname = lottie.loadAnimation({
    container: lottie_box, // json으로 바꾸기
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData,
  });
  btn_stop.addEventListener("click", function() {
    myname.stop();
    myname.goToAndStop(100, true);
  })
  btn_start.addEventListener("click", function() {
    myname.play();
  })
  const lottie_path = document.querySelectorAll('#lottie path');
  for(let i=0; i<lottie_path.length; i++){
    lottie_path[i].setAttribute("stroke", "blue");
  }
  // console.log(lottie_path); //??
})
