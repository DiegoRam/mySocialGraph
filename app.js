var fs = require("fs"),
  http = require("http"),
  express = require("express"),
  app = express(),
  io = require("socket.io"),
  twitter = require("ntwitter"),
  main = require("./src/controllers/main");

var port = Number(process.env.PORT || 9500);
var server = http.createServer(app).listen(port,function(){
  console.log("Express listening on port: " + port );
});

var ioServer = io.listen(server);

var tw = new twitter({
  consumer_key: "YOUR_CONSUMER_KEY",
  consumer_secret: "YOUR_CONSUMER_SECRET",
  access_token_key: "XXXXX",
  access_token_secret: "XXXXX"
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
