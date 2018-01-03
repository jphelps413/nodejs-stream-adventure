const split = require('split');
const through = require('through2');

const funky = [
  String.prototype.toUpperCase,
  String.prototype.toLowerCase,
];
let lineCount = 1;

process.stdin
  .pipe(split())
  .pipe(through(function worker(line, _, next) {
    this.push(`${funky[lineCount % 2].call(line.toString())}\n`);
    lineCount += 1;
    next();
  }))
  .pipe(process.stdout);
