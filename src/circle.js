var Mask = require('./mask');
var vector = require('./vector');

function Circle(element, attributes) {
    Mask.call(this, element)
    this.attributes = attributes || {};
    this.loadImage(vector.circle);
}

Circle.prototype = Object.create(Mask.prototype);

module.exports = Circle;