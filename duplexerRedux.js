const duplex = require('duplexer2');
const through = require('through2');

module.exports = function runner(counter) {
  const hits = {};

  function write(row, _, next) {
    hits[row.country] = (hits[row.country] || 0) + 1;
    next();
  }

  function end(done) {
    counter.setCounts(hits);
    done();
  }

  const streamIn = through.obj(write, end);
  return duplex({ objectMode: true }, streamIn, counter);
};
