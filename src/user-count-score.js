const UserCount = require('./user-count');

class UserCountScore extends UserCount {
  _transform(chunk, encoding, callback) {
    super._transform(chunk, encoding, callback, {label: 'hexlet score', regExp: this.scoreRegExp});
  }
  
  get scoreRegExp() {
    return /<div class='h1 hexlet-profile-count'>(\d{1,10})<\/div>\n<p class='lead'>балл[а|ов]?<\/p>/;
  }
}

module.exports = UserCountScore;