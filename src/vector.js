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

module.exports.el = el;
module.exports.namespaces = namespaces;