/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('lodash');
var CssSelector = require('../lib/CssSelector');
var getSpecificity = require('../lib/PreciseSelectorSpecificity');

module.exports = {
    id: 'top-selector-specificity-selector',
    name: 'Top Selector Specificity Selector',
    type: 'selector',
    aggregate: 'max',
    format: 'string',
    measure: function(selector) {
        return selector;
    },
    iterator: getSpecificity
};

var getSpecificity = function (idIdentifiers, classIdentifiers, attributeIdentifiers, pseudoClassIdentifiers, typeIdentifiers, pseudoElementIdentifiers) {
    return Number(
        String(idIdentifiers) +
        String(classIdentifiers + attributeIdentifiers + pseudoClassIdentifiers) +
        String(typeIdentifiers + pseudoElementIdentifiers)
    );
};

var countIdIdentifiers = function (identifier) {
    var regex = /#/,
        matches = regex.exec(identifier);

    if (matches && !countAttributeIdentifiers(identifier)) {
        return matches.length;
    }

    return 0;
};

var countClassIdentifiers = function (identifier) {
    var regex = /\./,
        matches = regex.exec(identifier);

    if (matches) {
        return matches.length;
    }

    return 0;
};

var countAttributeIdentifiers = function (identifier) {
    var regex = /\[/,
        matches = regex.exec(identifier);

    if (matches) {
        return matches.length;
    }

    return 0;
};

var countPseudoClassIdentifiers = function  (identifier) {
    var regex = /^:[^:]/,
        matches = regex.exec(identifier);

    // :not pseudo-class identifier itself is ignored
    // only selectors inside it are counted
    if (identifier.match(/:not/)) {
        return 0;
    }

    if (matches) {
        return matches.length;
    }

    return 0;
};

var countTypeIdentifiers = function (identifier) {
    var regex = /^[a-zA-Z_]/;

    if (regex.exec(identifier)) {
        return 1;
    }

    return 0;
};

var countPseudoElementIdentifiers = function (identifier) {
    var regex = /::/,
        matches = regex.exec(identifier);

    if (matches) {
        return matches.length;
    }

    return 0;
};

var stripNotIdentifier = function (identifier) {
    if (identifier.match(/:not/)) {
        return identifier.replace(/:not\(|\)/g, '');
    }

    return identifier;
};
