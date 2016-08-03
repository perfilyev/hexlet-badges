const Transform = require('stream').Transform;
var https = require('https');

class Badge extends Transform {
  constructor() {
    super({objectMode: true})
  }
  
  _transform({label = 'hexlet.io', count}, encoding, callback) {
    https
      .get(`https://img.shields.io/badge/${label}-${count}-green.png`, res => 
        res
          .on('data', this.push.bind(this))
          .on('end', callback))
  }
}

module.exports = Badge;