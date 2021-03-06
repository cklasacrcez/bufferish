// static.js

var Bufferish = require("./");

exports.alloc = alloc;
exports.concat = concat;
exports.from = from;

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer|Uint8Array|Array}
 */

function from(value) {
  if (typeof value === "string") {
    return fromString.call(this, value);
  } else {
    // Bufferish.from() may respect the source type
    var ref = this;
    if (!ref || ref === exports || ref === Bufferish) ref = value;
    return auto(ref).from(value);
  }
}

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return auto(this).alloc(size);
}

/**
 * @param list {Array} array of (Buffer|Uint8Array|Array)s
 * @param [length]
 * @returns {Buffer|Uint8Array|Array}
 */

function concat(list, length) {
  if (!length) {
    length = 0;
    Array.prototype.forEach.call(list, dryrun);
  }
  // Bufferish.concat() may respect the first element type
  var ref = this;
  if (!ref || ref === exports || ref === Bufferish) ref = list && list[0];
  var result = alloc.call(ref, length);
  var offset = 0;
  Array.prototype.forEach.call(list, append);
  return result;

  function dryrun(buffer) {
    length += buffer.length;
  }

  function append(buffer) {
    offset += Bufferish.prototype.copy.call(buffer, result, offset);
  }
}

/**
 * @private
 */

function fromString(value) {
  var expected = value.length * 3;
  var that = alloc.call(this, expected);
  var actual = Bufferish.prototype.write.call(that, value);
  if (expected !== actual) {
    that = Bufferish.prototype.slice.call(that, 0, actual);
  }
  return that;
}

function auto(that) {
  return Bufferish.isBuffer(that) ? Bufferish.Buffer
    : Bufferish.isView(that) ? Bufferish.Uint8Array
    : Bufferish.isArray(that) ? Bufferish.Array
    : (Bufferish.Buffer || Bufferish.Uint8Array || Bufferish.Array);
}
