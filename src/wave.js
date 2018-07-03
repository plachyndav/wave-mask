var Mask = require('./mask');
var vector = require('./vector');

function Wave(element) {
    Mask.call(this, element)
    this.attributes = attributes || {};
    this.loadImage(vector.wave);
}

Wave.prototype = Object.create(Mask.prototype);

module.exports = Wave;