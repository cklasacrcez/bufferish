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
  var LENGTH = [0, 1, 255, 256];

  it("Bufferish.alloc(size)", function() {
    LENGTH.forEach(each);

    function each(size) {
      var buf = Bufferish.alloc(size);
      assert.ok(buf);
      assert.equal(buf.length, size);
    }
  });

  it("Bufferish.Array.alloc(size)", function() {
    LENGTH.forEach(each);

    function each(size) {
      var buf = Bufferish.Array.alloc(size);
      assert.ok(buf);
      assert.ok(buf instanceof Array);
      assert.equal(buf.length, size);
    }
  });

  itBuffer("Bufferish.Buffer.alloc(size)", function() {
    LENGTH.forEach(each);

    function each(size) {
      var buf = Bufferish.Buffer.alloc(size);
      assert.ok(buf);
      assert.ok(Buffer.isBuffer(buf));
      assert.equal(buf.length, size);
    }
  });

  itUint8Array("Bufferish.Uint8Array.alloc(size)", function() {
    LENGTH.forEach(each);

    function each(size) {
      var buf = Bufferish.Uint8Array.alloc(size);
      assert.ok(buf);
      assert.ok(buf instanceof Uint8Array);
      assert.equal(buf.length, size);
    }
  });

  it("Bufferish.alloc.call(array, size)", function() {
    var ref = [1];
    var buf = Bufferish.alloc.call(ref, 2);
    assert.ok(buf);
    assert.ok(buf instanceof Array);
    assert.equal(ref.length, 1);
    assert.equal(buf.length, 2);
    buf[0] = 3;
    assert.equal(ref[0], 1);
    assert.equal(buf[0], 3);
  });

  itBuffer("Bufferish.alloc.call(buffer, size)", function() {
    var ref = new Buffer(1);
    ref[0] = 1;
    var buf = Bufferish.alloc.call(ref, 2);
    assert.ok(buf);
    assert.ok(Buffer.isBuffer(buf));
    assert.equal(ref.length, 1);
    assert.equal(buf.length, 2);
    buf[0] = 3;
    assert.equal(ref[0], 1);
    assert.equal(buf[0], 3);
  });

  itUint8Array("Bufferish.alloc.call(uint8array, size)", function() {
    var ref = new Uint8Array(1);
    ref[0] = 1;
    var buf = Bufferish.alloc.call(ref, 2);
    assert.ok(buf);
    assert.ok(ref instanceof Uint8Array);
    assert.equal(ref.length, 1);
    assert.equal(buf.length, 2);
    buf[0] = 3;
    assert.equal(ref[0], 1);
    assert.equal(buf[0], 3);
  });
}
