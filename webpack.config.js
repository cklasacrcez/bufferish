// webpack.config.js

var includeBuffer = !!process.env.INCLUDE_BUFFER;
var filename = includeBuffer ? "bufferish.buffer.js" : "bufferish.min.js";

module.exports = {
  entry: "./bufferish.js",
  node: {
    Buffer: includeBuffer
  },
  output: {
    path: __dirname + "/dist",
    filename: filename,
    library: "Bufferish",
    libraryTarget: "umd"
  }
};
