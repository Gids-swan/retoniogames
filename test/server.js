'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

var toRun = require('main.js');

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><p>Hi there! :)</p></body></html>', () => {
        console.log("This is a callback");
        console.log(req.url);
    });
    res.end();
})

server.listen(port);