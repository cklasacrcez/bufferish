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
  var itBuffer = hasBuffer ? it : it.skip;
  var itUint8Array = hasUint8Array ? it : it.skip;

  it("Bufferish.from(src)", function() {
    getlist().forEach(function(src) {
      var buf = Bufferish.from(src);
      assert.ok(buf);
      assert.equal(buf.length, 2);
      assert.equal(buf[0], 65);
      assert.equal(buf[1], 66);
    });
  });

  it("Bufferish.Array.from(src)", function() {
    getlist().forEach(function(src) {
      var buf = Bufferish.Array.from(src);
      assert.ok(buf instanceof Array);
      assert.equal(buf.length, 2);
      assert.equal(buf[0], 65);
      assert.equal(buf[1], 66);
    });
  });

  itBuffer("Bufferish.Buffer.from(src)", function() {
    getlist().forEach(function(src) {
      var buf = Bufferish.Buffer.from(src);
      assert.ok(buf instanceof Buffer);
      assert.equal(buf.length, 2);
      assert.equal(buf[0], 65);
      assert.equal(buf[1], 66);
    });
  });

  itUint8Array("Bufferish.Uint8Array.from(src)", function() {
    getlist().forEach(function(src) {
      var buf = Bufferish.Uint8Array.from(src);
      assert.ok(buf instanceof Uint8Array);
      assert.equal(buf.length, 2);
      assert.equal(buf[0], 65);
      assert.equal(buf[1], 66);
    });
  });

  function prepare(size) {
    var source = {};
    source.auto = Bufferish.alloc(size);
    source.array = new Array(size);
    if (hasBuffer) source.buffer = new Buffer(size);
    if (hasUint8Array) source.uint8array = new Uint8Array(size);
    source.string = "AB";
    return source;
  }

  function values(obj) {
    return Object.keys(obj).map(value);

    function value(key) {
      return obj[key];
    }
  }

  function getlist() {
    var list = values(prepare(2));
    Array.prototype.forEach.call(list, init);
    return list;
  }

  function init(buf) {
    if ("string" === typeof buf) return;
    buf[0] = 65;
    buf[1] = 66;
  }
}
