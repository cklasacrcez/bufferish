// bufferish.js

/* jshint eqnull:true */

var Buffer = exports.original = require("./original");
var hasBuffer = !!(Buffer && Buffer.isBuffer);
var hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

exports.isArray = Array.isArray || _is("Array");
exports.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false;
exports.isView = hasArrayBuffer ? (ArrayBuffer.isView || isView) : _false;

var Static = require("./static");
exports.alloc = Static.alloc;
exports.concat = Static.concat;
exports.from = Static.from;

exports.prototype = require("./prototype");

exports.Array = require("./array");

if (hasBuffer) {
  exports.Buffer = require("./buffer");
}

if (hasArrayBuffer) {
  exports.Uint8Array = require("./uint8array");
}

var _isArrayBuffer = _is("ArrayBuffer");

function isArrayBuffer(value) {
  return (value instanceof ArrayBuffer) || _isArrayBuffer(value);
}

function isView(value) {
  return (value != null) && isArrayBuffer(value.buffer);
}

function _false() {
  return false;
}

function _is(name) {
  name = "[object " + name + "]";
  return function(value) {
    return (value != null) && {}.toString.call(value) === name;
  };
}
