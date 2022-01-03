document.addEventListener("DOMContentLoaded", function() {
  const btn_stop = document.querySelector(".btn_stop");
  const btn_start = document.querySelector(".btn_start");
  const lottie_box = document.getElementById('lottie');
  let btns = document.querySelectorAll("button");
  let icons = document.querySelectorAll(".ICONs");
  let icon_spin_chk=true;
  let myname = lottie.loadAnimation({
    container: lottie_box, // json으로 바꾸기
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData,
  });
  const lottie_path = document.querySelectorAll('#lottie path');
  for (let i = 0; i < lottie_path.length; i++) {
    lottie_path[i].setAttribute("stroke", "blue");
  }
  btn_stop.addEventListener("click", function() {
    myname.stop();
    myname.goToAndStop(100, true);
    btns_light_on("start");
    icon_spin_chk=true;
    icon_spin_toggle();
  })
  btn_start.addEventListener("click", function() {
    myname.play();
    btns_light_on("stop");
    icon_spin_chk=false;
    icon_spin_toggle();
  })
  function btns_light_on(light_on){
    for(let i = 0; i < btns.length; i++) {
      btns[i].classList.remove("on");
    };
    light_on=="start"?btn_start.classList.add("on"):btn_stop.classList.add("on");
  }
  function icon_spin_toggle(){
    if(icon_spin_chk){
      for(let i = 0; i < icons.length; i++) {
        icons[i].classList.remove("on");
      };
    }
    else {
      for(let i = 0; i < icons.length; i++) {
        icons[i].classList.add("on");
      };
    }
  }
})
