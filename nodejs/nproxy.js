let express = require('express');
let httpProxy = require('http-proxy');
let app = express();
let PORT  = process.env.PORT || 3000;
let proxy = httpProxy.createProxyServer();
let prx_server = require('http').createServer(app).listen(PORT);

// proxy HTTP GET / POST
app.get('/', function(req, res) {
  console.log("proxying GET request: ", req.url);
  proxy.web(req, res, { target: 'ws://localhost:5443/ws'});
});

// Proxy websockets
prx_server.on('upgrade', function (req, socket, head) {
  console.log("proxying upgrade request", req.url);
  proxy.ws(req, socket, head);
});


