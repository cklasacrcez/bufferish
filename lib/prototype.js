// methods-auto.js

var Shim = require("./shim");

exports.copy = copy;
exports.slice = slice;
exports.toString = toString;
exports.write = gen("write");

var Bufferish = require("./");

var brokenSubarray = Bufferish.hasArrayBuffer && !checkSubarray();

/**
 * @param target {Buffer|Uint8Array|Array}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function copy(target, targetStart, start, end) {
  var thisIsBuffer = Bufferish.isBuffer(this);
  var targetIsBuffer = Bufferish.isBuffer(target);
  if (thisIsBuffer && targetIsBuffer) {
    // Buffer to Buffer
    return this.copy.apply(this, arguments);
  } else if (!brokenSubarray && !thisIsBuffer && !targetIsBuffer &&
    Bufferish.isView(this) && Bufferish.isView(target)) {
    // Uint8Array to Uint8Array (except for minor some browsers)
    var buffer = (start || end != null) ? slice.call(this, start, end) : this;
    target.set(buffer, targetStart);
    return buffer.length;
  } else {
    // other cases
    return Shim.copy.apply(this, arguments);
  }
}

/**
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function slice(start, end) {
  start |= 0;
  end = (end != null) ? (end | 0) : this.length;
  var f = this.slice || (!brokenSubarray && this.subarray) || Shim.slice;
  return f.call(this, start, end);
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  /* jshint unused:false */
  var f = Bufferish.isBuffer(this) ? this.toString : Shim.toString;
  return f.apply(this, arguments);
}

/**
 * @private
 */

function gen(method) {
  return wrap;

  function wrap() {
    var f = this[method] || Shim[method];
    return f.apply(this, arguments);
  }
}

function checkSubarray() {
  var array = new Uint8Array(1);
  // ie10 has broken `subarray`
  return array.subarray && (array.subarray(1, 1).byteLength === 0);
}

