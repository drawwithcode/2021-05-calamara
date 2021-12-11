let clientSocket = io();

//immagini
let sfondo;
let aereouno;
let aereodue;
//preload
function preload() {
  sfondo = loadImage("assets/sfondo.png");
  aereouno = loadImage("assets/aereo1.png");
  aereodue = loadImage("assets/aereo2.png");
}

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);
  //eseguo ogni volta che ricevo info da un altro client
  circle(data.x, data.y, 7);
  fill("white");
  stroke("white");
  cursor("aereodue", 50, 50);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(sfondo);
  frameRate(100);
}

function draw() {
  circle(mouseX, mouseY, 10);
  fill("lightGrey");
  stroke("lightGrey");
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
