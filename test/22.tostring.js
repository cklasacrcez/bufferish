#!/usr/bin/env mocha -R spec

/* globals describe, it, window */

var assert = require("assert");

var BufferishJS = "../bufferish";
var Global = ("undefined" !== typeof window) ? window : ("undefined" !== typeof global) ? global : this;
var Bufferish = Global.Bufferish || require(BufferishJS);
var Buffer = Bufferish.original;
var TITLE = __filename.replace(/^.*\//, "");

describe(TITLE, tests);

function tests() {
  var hasBuffer = ("undefined" !== typeof Buffer);
  var hasUint8Array = ("undefined" !== typeof Uint8Array);

  it("Bufferish.prototype.toString.call(src)", function() {
    getlist(4).forEach(function(src) {
      var str = Bufferish.prototype.toString.call(src);
      assert.equal(typeof str, "string");
      assert.equal(str, "ABCD");
    });
  });

  it("Bufferish.prototype.toString.call(src, undefined, start, end)", function() {
    getlist(4).forEach(function(src) {
      var str = Bufferish.prototype.toString.call(src, void 0, 1, 3);
      assert.equal(typeof str, "string");
      assert.equal(str, "BC");
    });
  });

  it("Bufferish.prototype.toString.call(bigsrc)", function() {
    getlist(65536).forEach(function(src) {
      var str = Bufferish.prototype.toString.call(src);
      assert.equal(typeof str, "string");
      assert.equal(str.length, 65536);
      assert.equal(str[0], "A");
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

  function getlist(size) {
    var list = values(prepare(size));
    Array.prototype.forEach.call(list, init);
    return list;

    function init(buf) {
      for (var i = 0; i < size; i++) {
        buf[i] = 65 + (i % 26); // A, B, C, ..., Z, A, B, C, ...
      }
    }
  }
}
