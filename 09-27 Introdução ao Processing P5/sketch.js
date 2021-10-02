let x_circle = 50;
let y_circle = 50;
let x_vel = 2;
let y_vel = 1.8;

let diametro = 50;
let raio = diametro / 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(50);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(110, 160, 210);

  x_circle += x_vel;
  y_circle += y_vel;

  if(x_circle + raio > width){
    x_vel *= -1;
  }
  if(x_circle - raio < 0){
    x_vel *= -1;
  }
  if(y_circle + raio > height){
    y_vel *= -1;
  }
  if(y_circle - raio < 0){
    y_vel *= -1;
  }
  
  fill(255);
  circle(x_circle, y_circle, diametro);
}
