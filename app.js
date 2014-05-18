var fs = require("fs"),
  http = require("http"),
  express = require("express"),
  app = express(),
  io = require("socket.io"),
  twitter = require("ntwitter"),
  port = 9500,
  main = require("./src/controllers/main");

var server = http.createServer(app).listen(port,function(){
  console.log("Express listening on port: " + port );
});

var ioServer = io.listen(server);

var tw = new twitter({
  consumer_key: "5gENEcDsjcUgtShz75IuRQaaJ",
  consumer_secret: "mJdXN5cql9KkIImjCci3VDa7Z60nAxfWOYbDdYNQRWqOIwIp7Q",
  access_token_key: "17760769-sxqFcpWjiV08vYe9dwHBownPBfarv2U1o0r0yiPES",
  access_token_secret: "ZQdiHsWJJFX6EexysKhMwL6PhMq92QxjlhcAD34UxL5g0"
});

var stream = null,
  track = "esturniolo, retux, nicovellonok",
  users = [];

app.get("/", main.home);
