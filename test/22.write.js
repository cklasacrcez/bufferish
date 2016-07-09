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

  it("Bufferish.prototype.write.call(buf, string)", function() {
    getlist(4).forEach(function(buf) {
      var len = Bufferish.prototype.write.call(buf, "ab");
      assert.equal(len, 2);
      assert.deepEqual(toArray(buf), [97, 98, 67, 68]);
    });
  });

  it("Bufferish.prototype.write.call(buf, string, offset)", function() {
    getlist(4).forEach(function(buf) {
      var len = Bufferish.prototype.write.call(buf, "ab", 1);
      assert.equal(len, 2);
      assert.deepEqual(toArray(buf), [65, 97, 98, 68]);
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
        buf[i] = 65 + (i % 26); // A, B, C, D
      }
    }
  }

  function toArray(array) {
    return Array.prototype.slice.call(array);
  }
}
