/**
 * Created by diegoram on 5/18/14.
 */
var socket = io.connect();
$(document).ready(function(){
    socket.on('new tweet',function(tweet){
         $('#messages').append(divSystemContentElement(JSON.stringify(tweet)));
    });
    socket.on('connected',function(r){
        $('#tracking').append(divSystemContentElement(JSON.stringify(r.tracking)));
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

function divEscapedContentElement(message){
    return $('<div></div>').text(message);
}

function divSystemContentElement(message){
    return $('<div></div>').html('<i>' + message + '</i>');
}
