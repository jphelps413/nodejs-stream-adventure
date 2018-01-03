const concat = require('concat-stream');

process.stdin
  .pipe(concat((data) => {
    // eslint-disable-next-line no-console
    console.log(data.toString().split('').reverse().join(''));
  }));
