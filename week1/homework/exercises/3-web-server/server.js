/**
 * Exercise 3: Create an HTTP web server
 */

let http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    fs.readFile("index.html", null, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write("index.html not found!");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.write(data);
        res.end();
      }
    });
  }

  if (req.url === "/index.js") {
    fs.readFile("index.js", null, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write("index.js not found!");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/javascript",
        });
        res.write(data);
        res.end();
      }
    });
  }

  if (req.url === "/style.css") {
    fs.readFile("style.css", null, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write("style.css not found!");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/css",
        });
        res.write(data);
        res.end();
      }
    });
  }
});

//I set the port to 8000 since 3000 kept giving mt an error that it's in use
server.listen(8000);
