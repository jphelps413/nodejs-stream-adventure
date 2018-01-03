const trumpet = require('trumpet');
const through = require('through2');

const tr = trumpet();
const loud = tr.select('.loud').createStream();

loud.pipe(through(function louder(chunk, _, next) {
  this.push(chunk.toString().toUpperCase());
  next();
})).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);
