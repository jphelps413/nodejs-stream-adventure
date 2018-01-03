const crypto = require('crypto');
const tar = require('tar');

const decrypt = crypto.createDecipher(process.argv[2], process.argv[3]);
const untar = new tar.Parse();

untar.on('entry', (e) => {
  if (e.type === 'File') {
    const md5 = crypto.createHash('md5', { encoding: 'hex' });
    e.pipe(md5).on('finish', () => {
      /* eslint-disable no-console */
      console.log(md5.read(), e.path);
      /* eslint-enable no-console */
    });
  }
  e.resume();
});

process.stdin.pipe(decrypt).pipe(untar);
