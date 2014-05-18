/**
 * Created by diegoram on 5/18/14.
 */
var socket = io.connect();
$(document).ready(function(){
    socket.on('new tweet',function(tweet){
        console.log("new tweet: " + JSON.stringify(tweet));
    });
    socket.on('connected',function(r){
        console.log("tracking: " + r.tracking);
        emitMsj("start stream");
    });
});

function emitMsj(signal, o) {
    if(socket) {
        socket.emit(signal, o);
    }
    else {
        alert("Shit! Socket.io didn't start!");
    }
}