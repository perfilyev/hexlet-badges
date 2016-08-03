const http = require('http');
const https = require('https');
const UserCountRate = require('./user-count-rate');
const UserCountScore = require('./user-count-score');
const Badge = require('./badge');

const server = http.createServer(({ url }, res) => {
  if (url === '/') {
    res.writeHead(302, {'Location': 'https://github.com/perfilyev/hexlet-badges'});
    res.end();
  } else {
    res.setHeader('Content-Type', 'image/png');
    
    https.get(`https://ru.hexlet.io/u${url}`, userPage => 
      userPage
        .pipe(getUserCount(url))
        .pipe(new Badge())
        .pipe(res))
  }
}).listen(process.env.port || 8080);

const getUserCount = url => {
  const query = url.split('?').slice(-1)[0];
  
  switch (query) {
    case 'score':
      return new UserCountScore();
    default:
      return new UserCountRate();
  }
}