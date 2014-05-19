/**
 * Created by diegoram on 5/18/14.
 */
var socket = io.connect();
var maxConsoleLines = 12;

$(document).ready(function(){
    socket.on('new tweet',function(tweet){
        checkCountOrRemove();
        $('#tweetlist').append(listEscapedElement(tweet.user.name + " : " + tweet.text));

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

function listEscapedElement(message){
    return $('<li></li>').text(message);
}

function divSystemContentElement(message){
    return $('<div></div>').html('<i>' + message + '</i>');
}

function checkCountOrRemove(){
    if ($('#tweetlist').find('li').length > maxConsoleLines){
        $('#tweetlist ').find('li').first().remove();
    }
}
