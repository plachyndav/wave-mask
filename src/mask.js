var Image = require('./img');
var Vector = require('./vector');

function Mask(element) {
    this.attributes = {};
    this.doneCallback = function () { };
    this.pipes = [];
    this.element = element;
}

Mask.num = 0;

Mask.prototype.onload = null;

Mask.prototype.loadImage = function () {
    var self = this;
    Image.load(this.element, function (loadObject) {
        Mask.num++;
        var image = loadObject.img;
        self.attributes.image = image;
        self.attributes.width = image.naturalWidth;
        self.attributes.height = image.naturalHeight;
        self.svg = Vector.createImageSvg(self.attributes, Image.base64Image(image), self.getId())
        self.pipes.forEach(function (pipe) {
            pipe(self.svg, self.attributes, self.getId());
        })
        self.doneCallback(self.svg);
    }, function (err) {
        console.log(err);
    })
}

Mask.prototype.cover = function () {
    this.pipes = Array.prototype.slice.call(arguments);
    return this;
}

Mask.prototype.done = function (cb) {
    this.doneCallback = cb;
    this.loadImage();
}

Mask.prototype.getId = function () {
    return 'mask-' + Mask.num;
}

Mask.prototype.toSrc = function () {
    return Image.toString('image/svg+xml', 'utf8', encodeURIComponent(new XMLSerializer().serializeToString(this.svg)));
}

module.exports = Mask;