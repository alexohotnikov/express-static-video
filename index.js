var HLSServer = require('hls-server')
var http = require('http')
var color = require('colors')
 
var server = http.createServer()
var hls = new HLSServer(server, {
  path: '/streams',     // Base URI to output HLS streams
  dir: 'public'  // Directory that input files are stored
})
server.listen(8000)
console.log("127.0.0.1:8000 port is worked as Stream Server".blue);