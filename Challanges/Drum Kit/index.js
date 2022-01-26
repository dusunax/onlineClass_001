window.addEventListener("DOMContentLoaded", function() {
  const eventKey_list = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
  const inst_list = ['tom1', 'tom2', 'tom3', 'tom4', 'crash', 'kick', 'snare'];
  const img_src = "images/";
  const sound_src = "sounds/";
  let item_count = 0;
  function handleClick() {
    sound_play(get_this_ImgUrl(this));
    color_change(this);
  }
  function get_this_ImgUrl(el_this) {
    let url = el_this.style.backgroundImage;
    url = url.split('/')[1];
    url = url.split('.')[0];
    return url;
  }
  function sound_play(inst_name) {
    let audio = new Audio(sound_src + inst_name + '.mp3')
    audio.play();
  }
  function color_change(el_this) {
    el_this.style.color = "orange";
    setTimeout(() => {
      el_this.style.color = "#DA0463";
    }, 200)
  }
  document.querySelectorAll(".drum").forEach((btn) => {
    btn.addEventListener('click', handleClick);
    btn.style.backgroundImage = `url(${img_src}${inst_list[item_count++]}.png)`
  })
})
