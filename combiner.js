const combine = require('stream-combiner');
const gzip = require('zlib');
const split = require('split');
const through = require('through2');

module.exports = function eslintHappy() {
  let entry;

  function pushIt(to) {
    if (entry) {
      to.push(`${JSON.stringify(entry)}\n`);
      entry = undefined;
    }
  }

  function write(raw, _, next) {
    if (raw.length > 0) {
      const line = JSON.parse(raw);
      if (line.type === 'genre') {
        pushIt(this);
        entry = { name: line.name, books: [] };
      } else if (line.type === 'book') {
        entry.books.push(line.name);
      }
    }
    next();
  }

  function end(done) {
    pushIt(this);
    done();
  }

  const splitter = split();
  const parser = through(write, end);
  const zipper = gzip.createGzip();

  return combine(splitter, parser, zipper);
};
