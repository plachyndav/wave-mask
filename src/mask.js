var Image = require('./img');

function Mask(element) {
    this.attributes = {};
    this.element = element;
}

Mask.num = 0;

Mask.prototype.onload = null;

Mask.prototype.loadImage = function (operation) {
    var self = this;
    Image.load(this.element, function (loadObject) {
        Mask.num++;
        var image = loadObject.img;
        self.attributes.image = image;
        self.attributes.width = image.naturalWidth;
        self.attributes.height = image.naturalHeight;
        self.onload && self.onload(self.svg = operation(self.attributes, Image.base64Image(image), self.getId()));
    }, function (err) {
        console.log(err);
    })
}

Mask.prototype.getId = function () {
    return 'mask-' + Mask.num;
}

Mask.prototype.toSrc = function () {
    return Image.toString('image/svg+xml', 'utf8', encodeURIComponent(new XMLSerializer().serializeToString(this.svg)));
}

module.exports = Mask;