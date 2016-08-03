const Transform = require('stream').Transform;

class UserCount extends Transform {
  constructor() {
    super({objectMode: true})
  }
  
  _transform(chunk, encoding, callback, {label, regExp}) {
    if (regExp.test(chunk)) {
      this.push({label, count: regExp.exec(chunk)[1]});
    }
    callback();
  }
}

module.exports = UserCount;