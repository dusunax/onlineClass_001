//jshint esversion:6

module.exports.getDate = function(){
  return 'hello';
}

let itemArr = Array.from(document.getElementsByClassName("item"));
itemArr.forEach((items) => {
  if (items !== itemArr[itemArr.length - 1]) {
    items.onclick = itemClick_lavel;
  };
});
function itemClick_lavel() {
  this.children[0].click();
};
