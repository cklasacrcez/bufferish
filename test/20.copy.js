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

  it("Bufferish.prototype.copy.call(src, target)", function() {
    getlist(100).forEach(function(src) {
      getlist(200).forEach(function(target) {
        Bufferish.prototype.copy.call(src, target);
        assert.deepEqual(toArray(target), toArray(src));
      });
    });
  });

  it("Bufferish.prototype.copy.call(src, target, targetStart, start, end)", function() {
    getlist(100).forEach(function(src) {
      getlist(200).forEach(function(target) {
        var tmp = toArray(target);
        Bufferish.prototype.copy.call(src, target, 1, 2, 3);
        assert.equal(target[0], tmp[0]); // not modified
        assert.equal(target[1], src[2]); // modified
        assert.equal(target[2], tmp[2]); // not modified
        assert.equal(target[3], tmp[3]); // not modified
      });
    });
  });

  function prepare(size) {
    var source = {};
    source.auto = Bufferish.alloc(size);
    source.array = Bufferish.Array.alloc(size);
    if (hasBuffer) source.buffer = Bufferish.Buffer.alloc(size);
    if (hasUint8Array) source.uint8array = Bufferish.Uint8Array.alloc(size);
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
