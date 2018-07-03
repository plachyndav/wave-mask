var load = function (node, successCb, errorCb) {
    var isElement = node instanceof HTMLImageElement;
    var img = isElement ? node : new Image();
    img.onload = function (e) {
        successCb({
            img: img,
            e: e
        });
    };
    img.onerror = errorCb;
    img.src = node instanceof HTMLImageElement ? node.src : node;
}

var toString = function (format, encoding, data) {
    return 'data:' + format + ';' + encoding + ',' + data;
}

var base64Image = function (image, format) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL(format);
}

module.exports.load = load;
module.exports.base64Image = base64Image;
module.exports.toString = toString;