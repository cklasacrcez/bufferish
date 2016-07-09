// bufferish.js

var Buffer = exports.original = require("./original");
var hasBuffer = !!(Buffer && Buffer.isBuffer);
var hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

exports.isArray = require("isarray");
exports.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false;
exports.isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

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

function _false() {
  return false;
}

function _is(name, key) {
  /* jshint eqnull:true */
  name = "[object " + name + "]";
  return function(value) {
    return (value != null) && {}.toString.call(key ? value[key] : value) === name;
  };
}
