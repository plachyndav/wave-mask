module.exports = function (node, successCb, errorCb) {
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