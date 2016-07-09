// zuul.config.js

var noBuffer = !!process.env.NO_BUFFER;
var filename = noBuffer ? "dist/bufferish.min.js" : "dist/bufferish.buffer.js";

module.exports = {
  sauce_username: "bufferish",
  sauce_key: "19ce1f89-5564-4d4a-aabb-a350002349b1",
  name: "bufferish",
  ui: "mocha-bdd",
  html: "test/zuul/zuul.html",
  concurrency: 3,
  browser_retries: 2,
  browser_output_timeout: 180,
  browser_open_timeout: 180,
  scripts: [filename],
  browsers: [
    {name: "ie", version: "9..latest"},
    {name: "chrome", version: "latest"},
    {name: "firefox", version: "46"},
    {name: "safari", version: "7..latest"},
    {name: "iphone", version: ["7.1", "8.4", "9.3..latest"]},
    {name: "android", version: ["4.1", "4.4", "5.1..latest"]}
  ]
};
