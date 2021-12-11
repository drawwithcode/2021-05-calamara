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
  fill("white");
  stroke("white");
  strokeWeight(10);
  line(data.x, data.y, data.x2, data.y2);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(sfondo);
  frameRate(100);
}

function draw() {
  push();
  noStroke();

  fill("pink");
  textSize(30);
  textAlign(CENTER);
  text("write your message in the sky", width / 2, height / 9 - 40);
  pop();
}

function mouseDragged() {
  push();
  stroke("lightGrey");
  strokeWeight(8);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
  //creare oggetto da mandare
  let message = {
    x: mouseX,
    y: mouseY,
    x2: pmouseX,
    y2: pmouseY,
  };
  //lo mando al server
  clientSocket.emit("mouse", message);
}
