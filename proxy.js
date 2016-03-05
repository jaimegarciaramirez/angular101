var http = require('http'),
    httpProxy = require('http-proxy');
var proxy = new httpProxy.RoutingProxy();

http.createServer(function (req, res) {
  var buffer = httpProxy.buffer(req);
  console.log(req.url);
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if (req.url.indexOf("/api") == 0) {
      req.url = req.url.replace(/\/api\//, "//");
      console.log("    Rewriting to: " + req.url);
      proxy.proxyRequest(req, res, {
            port: 8080,
            host: "localhost",
            buffer: buffer
       });
  } else {
  	  console.log("Going to localhost");
	  proxy.proxyRequest(req, res, {
	      port: 8081,
	      host: 'localhost',
	      buffer: buffer
	  });
  }
}).listen(4242);