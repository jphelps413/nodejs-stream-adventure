const request = require('request');

const URL = 'http://localhost:8099/';

process.stdin
  .pipe(request.post(URL))
  .pipe(process.stdout);
