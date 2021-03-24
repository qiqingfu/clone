// eslint-disable-next-line eol-last
const { build, cliopts } = require('estrella');
const path = require("path");

build({
  entry: 'index.ts',
  outfile: 'public/clone.js',
  debug: true,
  format: 'iife',
});

// eslint-disable-next-line no-unused-expressions
cliopts.watch && require('serve-http').createServer({
  port: 3003,
  pubdir: path.join(__dirname, 'public'),
});
