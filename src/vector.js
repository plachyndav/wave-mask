var namespaces = {
    svg: 'http://www.w3.org/2000/svg',
    xmlns: 'http://www.w3.org/2000/xmlns',
    xlink: 'http://www.w3.org/1999/xlink',
    xhtml: 'http://www.w3.org/1999/xhtml'
}

var argumentsToArray = function (args, from) {
    return Array.prototype.slice.call(args, from);
}

var appendChild = function (target, els) {
    els.forEach(function (el) {
        if (typeof el === 'string') {
            target.innerHTML += el;
        } else {
            target.appendChild(el)
        }
    });
}

var detectNamespace = function (attr) {
    var index = attr.indexOf(':');
    return attr.slice(0, index === -1 ? 0 : index);
}

var appendAttributes = function (el, attributes) {
    for (var attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
            var namespace = namespaces[detectNamespace(attr)];
            if (namespace) {
                el.setAttributeNS(namespace, attr, attributes[attr]);
            } else {
                el.setAttribute(attr, attributes[attr]);
            }
        }
    }
}

var el = function (elName, attributes) {
    var el = document.createElementNS(namespaces[detectNamespace(elName) || 'svg'], elName)
    appendAttributes(el, attributes)
    appendChild(el, argumentsToArray(arguments, 2));
    return el;
}

var toBase64 = function (el) {
    if (!(el instanceof SVGSVGElement)) throw new Error('Parameter should be an SVG element');
    return btoa(el.outerHTML);
}

function getRandomArbitrary(min, max) {
    return max ? Math.random() * (max - min) + min : Math.random() * min;
}

var randomShape = function (attributes) {
    var startPoint = 'M' + deep + ' ' + deep;
    var d = startPoint;
    var difference = .1;
    var pointsHeight = Math.ceil(height / pointsSpace);
    var pointsWidth = Math.ceil(width / pointsSpace);
    var previousCurveEnd = [deep, deep];
    for (var i = 0,
            step = deep * 2,
            start = step - getRandomArbitrary(step * difference),
            next = getRandomArbitrary(start, step + deep); i < pointsHeight; i++,
        step = deep * (i + 2),
        start = getRandomArbitrary(next, step),
        next = getRandomArbitrary(start, step + deep)) {}
    return el('path', {
        fill: '#fff',
        stroke: '#fff',
        'stroke-width': 1.5,
        d: d
    });
}

var createMaskSvg = function (attributes, imageSrc, maskElement, maskId) {
    maskId = maskId || 'mask';
    return el('svg', {
            xmlns: namespaces.svg,
            width: attributes.width,
            height: attributes.height,
        },
        el('defs', null,
            el('mask', {
                    id: maskId,
                },
                maskElement
            )
        ),
        el('image', {
            width: attributes.width,
            height: attributes.height,
            'xlink:href': imageSrc,
            mask: 'url(#' + maskId + ')'
        })
    );
}

var circle = function (attributes, src, maskId) {
    var circle = el('circle', {
        r: Math.min(attributes.width, attributes.height) / 2,
        cx: attributes.width / 2,
        cy: attributes.height / 2,
        fill: '#fff'
    });
    return createMaskSvg(attributes, src, circle, maskId);
}

var wave = function (attributes, src, maskId) {
    return createMaskSvg(attributes, src, maskId);
}


module.exports.el = el;
module.exports.namespaces = namespaces;
module.exports.wave = wave;
module.exports.toBase64 = toBase64;
module.exports.circle = circle;