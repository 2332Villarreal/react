'use strict';

var l, s;
if (process.env.NODE_ENV === 'production') {
  l = require('./cjs/react-dom-server-legacy.browser.production.min.js');
  s = require('./cjs/react-dom-server.bun.production.min.js');
} else {
  l = require('./cjs/react-dom-server-legacy.browser.development.js');
  s = require('./cjs/react-dom-server.bun.development.js');
}

exports.version = l.version;
exports.renderToString = l.renderToString;
exports.renderToStaticMarkup = l.renderToStaticMarkup;
exports.renderToStaticNodeStream = s.renderToStaticNodeStream;
exports.renderToNodeStream = s.renderToNodeStream;
exports.renderToReadableStream = s.renderToReadableStream;

if (typeof s.renderIntoContainer === 'function') {
  exports.renderIntoContainer = s.renderIntoContainer;
}
