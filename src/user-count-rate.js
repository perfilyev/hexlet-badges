const UserCount = require('./user-count');

class UserCountRate extends UserCount {
  _transform(chunk, encoding, callback) {
    super._transform(chunk, encoding, callback, {regExp: this.rateRegExp})
  }
  
  get rateRegExp() {
    return /<div class='h1 hexlet-profile-count'>(\d{1,10})<\/div>\n<p class='lead'>в рейтинге<\/p>/;
  }
}

module.exports = UserCountRate;