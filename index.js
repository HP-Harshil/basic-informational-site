const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, '/', req.url == '/' ? 'index.html' : req.url);
  let extName = path.extname(filePath);
  let contentType = 'text/html';

  switch(extName) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        fs.readFile(path.join(__dirname, '/','404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html'});
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      } 
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT);