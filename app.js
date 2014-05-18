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
  track = "esturniolo, retux, nicovellonok, boudou",
  users = [];

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

ioServer.sockets.on("connection", function(socket){
    if(users.indexOf(socket.id) === -1){
        users.push(socket.id);
    }
    main.logConnectedUsers(users);
    socket.on("start stream", function(){
        if(stream == null){
            tw.stream("statuses/filter",{
                track: track
            }, function(s){
               stream = s ;
               stream.on("data", function(data){
                   if(users.length > 0){
                       socket.broadcast.emit('new tweet', data);
                       socket.emit('new tweet', data);
                   } else {
                       stream.destroy();
                       stream = null ;
                   }
               });
            });
        }
    });

    socket.on("disconnect", function(o){
        var index = users.indexOf(socket.id);
        if(index != -1){
            users.splice(index, 1);
        }
        main.logConnectedUsers(users);
    });

    socket.emit("connected", {
        tracking: track
    });
});


app.get("/", main.home);
