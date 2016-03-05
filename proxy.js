var http = require('http')
var httpProxy = require('http-proxy')
var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(8081, function () {
  console.log('UI App is listening on port 8081!');
});

var proxy = httpProxy.createProxyServer()

var server = http.createServer(function(request, response) {
    if (request.url.indexOf('/api') == 0) {
        request.url = request.url.substring(4)
        console.log(request.url + " routed to 8080")
        proxy.proxyRequest(request, response, {
            target: "http://localhost:8080"
        })
    } else {
        console.log(request.url + " routed to 8081")
        proxy.proxyRequest(request, response, {
            target: "http://localhost:8081"
        })
    }
})

server.listen(3000, function() {
    console.log('Server is started on port 3000')
})

