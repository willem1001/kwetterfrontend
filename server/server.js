var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

let clients = [];
app.ws('/tweets', function (ws, req) {
  clients.push(ws);
  ws.on('message', function (msg) {
    clients.forEach(c => c.send(msg));
  });
  ws.on('close', () => {
    clients.splice(clients.indexOf(ws));
  });
});

app.listen(3001);
console.log('listening @ :3001');
