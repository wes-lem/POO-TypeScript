let x_circle = 0;
let x_rect = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(10);
  noStroke();
  rectMode(CENTER);
}



function draw() {
  background(110, 160, 210);
  x_circle += 5;
  if(x_circle > width){
    x_circle = 0;
  }
  circle(x_circle, height/2, 50);

  x_rect += 4;
  if(x_rect > width){
    x_rect = 0;
  }
  rect(x_rect, 100, 50, 50)

}
