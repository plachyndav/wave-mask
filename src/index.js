var Circle = require('./circle');
var withMaskImages = document.getElementsByClassName('with-mask');
Array.prototype.forEach.call(withMaskImages, function (el) {
    var wave = new Circle(el);
    wave.onload = function (svg) {
        var parent = el.parentElement;
        parent.innerHTML = '';
        parent.appendChild(svg);
    }
});