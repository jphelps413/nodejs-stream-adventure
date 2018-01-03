const http = require('http');
const through = require('through2');

const server = http.createServer((request, response) => {
  if (request.method !== 'POST') {
    return response.end('only processing POSTs');
  }

  return request // the return makes eslint happy
    .pipe(through(function chunker(chunk, _, next) {
      this.push(chunk.toString().toUpperCase());
      next();
    }))
    .pipe(response);
});

server.listen(+process.argv[2]);
