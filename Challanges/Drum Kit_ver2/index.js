window.addEventListener("DOMContentLoaded", function() {
  const actual_btns=document.querySelectorAll('button')
  const eventKey_list = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
  const inst_list = ['tom1', 'tom2', 'tom3', 'tom4', 'crash', 'kick', 'snare'];
  const img_src = "images/";
  const sound_src = "sounds/";
  let item_count = 0;

  function handleKeyDown(){
    eventKey_list.forEach((list)=>{
      if(event.key==list){
        buttonAnimation(event.key);
        sound_play(event.key);
      };
    });
  }
  function handleClick() {
    buttonAnimation(this.innerHTML);
    sound_play(this.innerHTML);
  }
  function sound_play(key) {
    for(let i=0; i<eventKey_list.length-1; i++){
      if(key==eventKey_list[i]){
        var sound = new Audio(sound_src + inst_list[i] + '.mp3');
        sound.play();
        break;
      }
    }
  }
  function buttonAnimation(curr_key) {
    let el_this=document.querySelector('.'+curr_key)
    el_this.classList.add('activate');
    setTimeout(() => {
      el_this.classList.remove('activate');
    }, 200)
  }
  document.querySelectorAll(".drum").forEach((btn) => {
    btn.addEventListener('click', handleClick);
    btn.style.backgroundImage = `url(${img_src}${inst_list[item_count++]}.png)`
  });
  document.addEventListener('keydown', handleKeyDown);
})
