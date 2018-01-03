const crypto = require('crypto');

const decrypt = crypto.createDecipher('aes256', process.argv[2]);

process.stdin.pipe(decrypt).pipe(process.stdout);
