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

  it("Bufferish.isArray(array)", function() {
    assert.ok(Bufferish.isArray(new Array(1)));
    if (hasBuffer) assert.ok(!Bufferish.isArray(new Buffer(1)));
    if (hasUint8Array) assert.ok(!Bufferish.isArray(new Uint8Array(1)));
    if (hasUint8Array) assert.ok(!Bufferish.isArray(new Uint8Array(1).buffer)); // ArrayBuffer
  });

  it("Bufferish.isArrayBuffer(arraybuffer)", function() {
    assert.ok(!Bufferish.isArrayBuffer(new Array(1)));
    if (hasBuffer) assert.ok(!Bufferish.isArrayBuffer(new Buffer(1)));
    if (hasUint8Array) assert.ok(!Bufferish.isArrayBuffer(new Uint8Array(1)));
    if (hasUint8Array) assert.ok(Bufferish.isArrayBuffer(new Uint8Array(1).buffer)); // ArrayBuffer
  });

  it("Bufferish.isBuffer(buffer)", function() {
    assert.ok(!Bufferish.isBuffer(new Array(1)));
    if (hasBuffer) assert.ok(Bufferish.isBuffer(new Buffer(1)));
    if (hasUint8Array) assert.ok(!Bufferish.isBuffer(new Uint8Array(1)));
    if (hasUint8Array) assert.ok(!Bufferish.isBuffer(new Uint8Array(1).buffer)); // ArrayBuffer
  });

  it("Bufferish.isView(typedarray)", function() {
    assert.ok(!Bufferish.isView(new Array(1)));
    // if (hasBuffer) assert.ok(!Bufferish.isView(new Buffer(1))); // Buffer may be a TypedArray
    if (hasUint8Array) assert.ok(Bufferish.isView(new Uint8Array(1)));
    if (hasUint8Array) assert.ok(!Bufferish.isView(new Uint8Array(1).buffer)); // ArrayBuffer
  });
}
