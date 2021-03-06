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
  var itBuffer = hasBuffer ? it : it.skip;
  var itUint8Array = hasUint8Array ? it : it.skip;

  it("Bufferish.concat([])", function() {
    var buf = Bufferish.concat([]);
    assert.ok(buf);
    assert.equal(buf.length, 0);
  });

  // test that Bufferish.concat() respects the first argument
  it("Bufferish.concat([array])", function() {
    var source = prepare(1);
    assert.ok(Bufferish.isArray(Bufferish.concat([source.array])));
  });

  itBuffer("Bufferish.concat([buffer])", function() {
    var source = prepare(1);
    assert.ok(Bufferish.isBuffer(Bufferish.concat([source.buffer])));
  });

  itUint8Array("Bufferish.concat([uint8array])", function() {
    var source = prepare(1);
    assert.ok(Bufferish.isView(Bufferish.concat([source.uint8array])));
  });

  it("Bufferish.concat(list)", function() {
    var list = getlist();
    var buf = Bufferish.concat(list);
    assert.ok(buf);
    Array.prototype.forEach.call(buf, check);
  });

  it("Bufferish.Array.concat(list)", function() {
    var list = getlist();
    var buf = Bufferish.Array.concat(list);
    assert.ok(buf instanceof Array);
    Array.prototype.forEach.call(buf, check);
  });

  itBuffer("Bufferish.Buffer.concat(list)", function() {
    var list = getlist();
    var buf = Bufferish.Buffer.concat(list);
    assert.ok(Buffer.isBuffer(buf));
    Array.prototype.forEach.call(buf, check);
  });

  itUint8Array("Bufferish.Uint8Array.concat(list)", function() {
    var list = getlist();
    var buf = Bufferish.Uint8Array.concat(list);
    assert.ok(buf instanceof Uint8Array);
    Array.prototype.forEach.call(buf, check);
  });

  it("Bufferish.concat.call(array, list)", function() {
    var ref = [];
    var list = getlist();
    var buf = Bufferish.concat.call(ref, list);
    assert.ok(buf instanceof Array);
    Array.prototype.forEach.call(buf, check);
  });

  itBuffer("Bufferish.concat.call(buffer, list)", function() {
    var ref = new Buffer(0);
    var list = getlist();
    var buf = Bufferish.concat.call(ref, list);
    assert.ok(Buffer.isBuffer(buf));
    Array.prototype.forEach.call(buf, check);
  });

  itUint8Array("Bufferish.concat.call(uint8array, list)", function() {
    var ref = new Uint8Array(0);
    var list = getlist();
    var buf = Bufferish.concat.call(ref, list);
    assert.ok(buf instanceof Uint8Array);
    Array.prototype.forEach.call(buf, check);
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

  function getlist() {
    var list = values(prepare(2));
    Array.prototype.forEach.call(list, init);
    return list;
  }

  function init(buf, idx) {
    buf[0] = idx * 2 + 1;
    buf[1] = idx * 2 + 2;
  }

  function check(val, idx) {
    assert.equal(val, idx + 1);
  }
}
