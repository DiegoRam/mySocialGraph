module.exports = {
  home: home,
  logConnectedUsers: logConnectedUsers
}

function home(req, res){
  res.render("index");
}

function logConnectedUsers(users){
    console.log("================CONNECTED USERS==============");
    console.log("=======  ::   " + users.length);
    console.log("=============================================");
}
