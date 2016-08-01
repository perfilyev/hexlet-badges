var http = require('http');
var https = require('https');
const Transform = require('stream').Transform;

class UserCount extends Transform {
  _transform(chunk, encoding, callback) {
    if (this.parsed !== true && this.userCountRegExp.test(chunk)) {
      this.parsed = true;
      this.push(this.userCountRegExp.exec(chunk)[1]);
    }
    callback();
  }
  
  get userCountRegExp() {
    return /<div class='h1 hexlet-profile-count'>(.*)<\/div>\n<p class='lead'>в рейтинге<\/p>/;
  }
}

class Badge extends Transform {
  _transform(chunk, encoding, callback) {
    console.log('Badge', chunk.toString())
      https
        .get(`https://img.shields.io/badge/hexlet-${chunk.toString()}-green.svg`, res => 
          res
            .on('data', this.push.bind(this))
            .on('end', callback))
  }
}

const server = http.createServer((req,res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  
  https
    .get(`https://ru.hexlet.io/u${req.url}`, r => 
      r.pipe(new UserCount()).pipe(new Badge()).pipe(res))
}).listen(8080);