// webpack.config.js

module.exports = {
  entry: "./bufferish.js",
  node: {
    Buffer: false
  },
  output: {
    path: __dirname + "/dist",
    filename: "bufferish.min.js",
    library: "Bufferish",
    libraryTarget: "umd"
  }
};
