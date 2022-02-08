// const fs=require('fs');
//
// fs.copyFileSync('file1.txt', 'file2.txt');
var sups=require('superheroes');
var villains=require('supervillains')

let action=['attack', 'tackle', 'punch', 'hit']
let hero=sups.random();
let villain=villains.random();
console.log(`${hero} attack ${villain}!`);

let win;
Math.round(Math.random())>0?win='win!':win='loose...';
console.log(`${hero} ${win}`);
