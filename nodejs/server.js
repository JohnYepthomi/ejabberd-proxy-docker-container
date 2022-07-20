let httpProxy = require('http-proxy')
let proxy = httpProxy.createProxy({
  ws : true
});

let PORT =  process.env.PORT || 4200;

let options = {
  'herp.dev': 'ws://localhost:5443/ws'
}

var server = require('http').createServer(function(req, res) {
  
  if(req.url === '/'){
    console.log("proxying websocket request: ", req.url);
    proxy.web(req, res, {
      target: 'ws://localhost:5443/ws'
    },function(e){
      log_error(e,req);
    });
  }else if (req.url.includes('/api/')){
    let target = `http://localhost:5443${req.url}`;
    console.log("proxying API request: ", target);

    proxy.web(req, res, { target },function(e){
      log_error(e,req);
    });
  }else{
    console.log("proxying ADMIN Portal: ", req.url);
    proxy.web(req, res, {
      target: 'http://localhost:5443/admin'
    },function(e){
      log_error(e,req);
    }); 
  }
});

server.on('upgrade',function(req,res){
  console.log("proxying upgrade request", req.url);
  proxy.ws(req, res, {
    target: 'ws://localhost:5443/ws'
  },function(e){
    log_error(e,req);
  });
})

server.listen(PORT)

function log_error(e,req){
  if(e){
    console.error(e.message);
    console.log(req.headers.host,'-->',options[req.headers.host]);
    console.log('-----');
  }
}
