var load = require('./load');
var vector = require('./vector');

function Wave(element) {
    this.element = element;
    this.image = null;
    this.width = null;
    this.height = null;
    this.loadImage();
}

Wave.num = 0;

Wave.prototype.onload = null;

Wave.prototype.loadImage = function () {
    var self = this;
    load(this.element, function (loadObject) {
        Wave.num++;
        self.image = loadObject.img;
        self.width = self.image.clientWidth;
        self.height = self.image.clientHeight;
        self.onload && self.onload(self.drawWave());
    }, function (err) {
        console.log(err);
    })
}

Wave.prototype.drawWave = function () {
    var maskId = 'mask-' + Wave.num;
    var svgElement = vector.el('svg',
        {
            xmlns: vector.namespaces.svg,
            width: this.width,
            height: this.height,
        },
        vector.el('defs', null,
            vector.el('mask', {
                id: maskId
            },
                vector.el('circle', {
                    cx: this.width / 2 - 75,
                    cy: this.height / 2 - 75,
                    r: 150,
                    fill: '#fff'
                }))
        ),
        vector.el('image', {
            width: this.width,
            height: this.height,
            'xlink:href': this.image.src,
            mask: 'url(#' + maskId + ')'
        })
    );
    return svgElement;
}

module.exports = Wave;