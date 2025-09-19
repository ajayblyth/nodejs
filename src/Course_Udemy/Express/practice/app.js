


const { readFileSync } = require('fs');   // import once
const http = require('http');

// read index.html file once when server starts
const homepage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');

const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');




const server = http.createServer((req, res) => {
//   console.log('user hit the server');
//   console.log(req.method);
  console.log(req.url);

  const url = req.url;

  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(homepage);
    res.end();
  }
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h1>About Page</h1>');
    res.end();
  }
    else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' });
    res.write(homeStyles);
    res.end();
  }  else if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' });
    res.write(homeImage);
    res.end();
  }
    else if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.write(homeLogic);
    res.end();
  }
  else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('<h1>Page Not Found</h1>');
    res.end();
  }
});

server.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
