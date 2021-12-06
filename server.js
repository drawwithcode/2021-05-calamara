//setup del server
console.log("hdudhuiehde");
let express = require("express");
let app = express();
let port = 3000;
let server = app.listen(port);
console.log("server is running on http://localhost:" + port);
app.use(express.static("public"));
//fine setup server

let serverSocket = require("socket.io");
let io = serverSocket(server);

//
io.on("connection", newConnection);
function newConnection(newSocket) {
  console.log(newSocket.id);
  //le cose che succedono in relazione al client
  //quando il new socket mi manda il messaggio mouse devo fare questa cosa
  newSocket.on("mouse", mouseMessage);
  function mouseMessage(dataReceived) {
    console.log(dataReceived);
    //manda quest'informazione a tutti i client
    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}
