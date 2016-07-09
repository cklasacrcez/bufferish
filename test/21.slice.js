#!/usr/bin/env mocha -R spec

/* globals describe, it */

var assert = require("assert");

var BufferishJS = "../bufferish";
var Bufferish = this.Bufferish || require(BufferishJS);
var Buffer = Bufferish.original;
var TITLE = __filename.replace(/^.*\//, "");

describe(TITLE, tests);

function tests() {
  var hasBuffer = ("undefined" !== typeof Buffer);
  var hasUint8Array = ("undefined" !== typeof Uint8Array);

  it("Bufferish.prototype.slice.call(src)", function() {
    getlist(100).forEach(function(src) {
      var buf = Bufferish.prototype.slice.call(src);
      assert.deepEqual(toArray(buf), toArray(src));
    });
  });

  it("Bufferish.prototype.slice.call(src, start, end)", function() {
    getlist(100).forEach(function(src) {
      var buf = Bufferish.prototype.slice.call(src, 1, 3);
      var check = Array.prototype.slice.call(src, 1, 3);
      assert.deepEqual(toArray(buf), toArray(check));
    });
  });

  function prepare(size) {
    var source = {};
    source.auto = Bufferish.alloc(size);
    source.array = new Array(size);
    if (hasBuffer) source.buffer = new Buffer(size);
    if (hasUint8Array) source.uint8array = new Uint8Array(size);
    return source;
  }

  function values(obj) {
    return Object.keys(obj).map(value);

    function value(key) {
      return obj[key];
    }
  }

  function getlist(offset) {
    offset |= 0;
    var list = values(prepare(4));
    Array.prototype.forEach.call(list, init);
    return list;

    function init(buf, idx) {
      buf[0] = idx * 4 + offset + 1;
      buf[1] = idx * 4 + offset + 2;
      buf[2] = idx * 4 + offset + 3;
      buf[3] = idx * 4 + offset + 4;
    }
  }

  function toArray(array) {
    return Array.prototype.slice.call(array);
  }
}
