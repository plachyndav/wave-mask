var Wave = require('./wave');
var holder = document.getElementsByClassName('image-holder')[0];
var wave = new Wave(document.getElementsByTagName('img')[0]);
wave.onload = function (svg) {
    holder.innerHTML = '';
    holder.appendChild(svg);
}