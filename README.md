# bufferish [![Build Status](https://travis-ci.org/kawanet/bufferish.svg?branch=master)](https://travis-ci.org/kawanet/bufferish)

This module provides some compatible methods of Node.js's [Buffer API](https://nodejs.org/api/buffer.html)
which work with `Uint8Array` and `Array` as well as `Buffer` instance.
It's light-weight and just 5KB when minified without [Buffer](https://www.npmjs.com/package/buffer) shim.

[![Build Status](https://saucelabs.com/browser-matrix/bufferish.svg)](https://saucelabs.com/beta/builds/edba9addceeb41ee89df3648c076a99d)

### alloc(size)

See [Buffer.alloc()](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_alloc_size_fill_encoding).

```js
Bufferish.Array.alloc(size)
```

It creates a new `Array` instance of `size` elements.

```js
Bufferish.Buffer.alloc(size)
```

It creates a new `Buffer` instance of `size` bytes.
It's available only when `Buffer` class available.

```js
Bufferish.Uint8Array.alloc(size)
```

It creates a new `Uint8Array` instance of `size` bytes.
It's available only when `Uint8Array` class available.

```js
Bufferish.alloc(size)
```

It creates a new instance of one of `Buffer`, `Uint8Array` or `Array`, depending on the environment.

```js
Bufferish.alloc.call(ref, size)
```

It creates the same type instance of `ref` which is one of `Buffer`, `Uint8Array` or `Array` instances.
It may cost less when a native copy methods is available.

### from(src)

See [Buffer.from()](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array).
`src` is an Array-like instance such as `Buffer`, `Uint8Array` or `Array`. `String` is also allowed.

```js
Bufferish.Array.from(src)
```

It creates a new `Array` instance copied from `src`.

```js
Bufferish.Buffer.from(src)
```

It creates a new `Buffer` instance copied from `src`.

```js
Bufferish.Uint8Array.from(src)
```

It creates a new `Uint8Array` instance copied from `src`.

```js
Bufferish.from(src)
```

It creates a copied instance of one of `Buffer`, `Uint8Array` or `Array`, depending on the environment.

### concat(list)

See [Buffer.concat()](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_concat_list_totallength).
`list` is an `Array` which contains an Array-like instances such `Buffer`, `Uint8Array` or `Array`.

```js
Bufferish.Array.concat(list)
```

It creates a new `Array` instance concatenated.

```js
Bufferish.Buffer.concat(list)
```

It creates a new `Buffer` instance concatenated.

```js
Bufferish.Uint8Array.concat(list)
```

It creates a new `Uint8Array` instance concatenated.

```js
Bufferish.concat(list)
```

It creates a concatenated instance of one of `Buffer`, `Uint8Array` or `Array`, depending on the environment.

### Bufferish.isXXX()

```js
Bufferish.isArray(array)
```

It returns `true` if `array` is an `Array` instance.
See [Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray).

```js
Bufferish.isArrayBuffer(arraybuffer)
```

It returns `true` if `arraybuffer` is an `ArrayBuffer` instance.

```js
Bufferish.isBuffer(buffer)
```

It returns `true` if `buffer` is a `Buffer` instance.
See [Buffer.isBuffer()](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_isbuffer_obj).

```js
Bufferish.isView(typedarray)
```

It returns `true` if `typedarray` is `Uint8Array` or other `TypedArray` instance.
See [ArrayBuffer.isView()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView).

### Bufferish.prototype.XXX.call()

Those methods must be called with `call()` to perform the trick.

`src` is an Array-like instance such as `Buffer`, `Uint8Array` or `Array`.

```js
Bufferish.prototype.copy.call(src, target, targetStart, start, end)
```

It copies data from a region of `src` to a region in `target`.
See [Buffer.prototype.copy()](https://nodejs.org/api/buffer.html#buffer_buf_copy_targetbuffer_targetstart_sourcestart_sourceend).

```js
Bufferish.prototype.slice.call(src, start, end)
```

It returns a new instance from a region of `src`.
See [Buffer.prototype.slice()](https://nodejs.org/api/buffer.html#buffer_buf_slice_start_end).

```js
Bufferish.prototype.toString.call(src, encoding, start, end)
```

It returns a `String` from a region of `src`.
Please note that `encoding` may not be supported and just ignored.
See [Buffer.prototype.toString()](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end).

```js
Bufferish.prototype.write.call(buf, string, offset)
```

It writes `String` to `buf` at the offset.
See [Buffer.prototype.write()](https://nodejs.org/api/buffer.html#buffer_buf_write_string_offset_length_encoding).

### Other methods

Any other methods which are not described above are not supported with the module.
Please consult with [Buffer](https://www.npmjs.com/package/buffer) shim instead.

### Installation

```sh
npm install bufferish --save
```

### Webpacked

The standalone builds for Web browsers are also shipped.

- https://rawgit.com/kawanet/bufferish/master/dist/bufferish.min.js

It's minified WITHOUT [Buffer](https://www.npmjs.com/package/buffer) shim. Just 5KB.

- https://rawgit.com/kawanet/bufferish/master/dist/bufferish.buffer.js

It's minified WITH [Buffer](https://www.npmjs.com/package/buffer) shim. 26KB.
`Bufferish.original` refers the shim module.

### GitHub

- [https://github.com/kawanet/bufferish](https://github.com/kawanet/bufferish)

### License

The MIT License (MIT)

Copyright (c) 2016 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
