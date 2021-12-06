let clientSocket = io();

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);
  //eseguo ogni volta che ricevo info da un altro sclient
  circle(data.x, data.y, 10);
  fill("red");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  circle(mouseX, mouseY, 20);
}

function mouseMoved() {
  //creare oggetto da mandare
  let message = {
    x: mouseX,
    y: mouseY,
  };
  //lo mando al server
  clientSocket.emit("mouse", message);
}
