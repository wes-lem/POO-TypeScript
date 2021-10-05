// desenhando um quadrado
// criando
// desenhando a matriz
// movimento do teclado

import p5 from "p5";

// dando volta

// mostrando framerate
// entendendo um timer
// andando sozinho
// andando com teclado

// class Cell{
//   x:number;
//   y:number;

//   color: p5.Color;

//   constructor(x:number, y:number, color:p5.Color){
//     this.x = x;
//     this.y = y;
//     this.color = color;
//   }
// }

// class Snake{
//   cells: Cell[];
//   vx: number;
//   vy:number;
//   color:p5.Color;
//   /////////////////parei aqui
// }

const NL = 6;
const NC = 6;
const lado = 50;

let snake_x = 2;
let snake_y = 0;
let snake_vx = 0;
let snake_vy = 0;

let snake_color;
let cell_color;

let timer = 0;

let food_x = 0;
let food_y = 0;
let food_color;
let food_count = 0;

let tempo = 0;
let tempoFALTA = 5;

function count_reset(){
  if(frameCount - tempo > 30){
    tempo = frameCount;
    tempoFALTA -= 1;
  }

  if(tempoFALTA < 1){
    food_count = 0
    tempoFALTA = 5;
  }
}

function setup() {
  createCanvas(NC * lado, NL * lado);
  frameRate(30);

  snake_color = color("blue");
  cell_color = color("gray");

  food_generate();
}

function food_generate(){
  food_x = parseInt(random(0, NC));
  food_y = parseInt(random(0, NL));

  food_color = color(255, random(255), random(255));
}

function draw_cell(x,y, color){
  noStroke();
  fill(color);
  square(x * lado + 1, y * lado + 1, lado - 1);
}

function draw_mat(){
  fill(155);
  for(let c = 0; c < NC; c++){
    for(let l = 0; l < NL; l++){
      draw_cell(c, l, cell_color);
    }
  }
}

function snake_loop(){
  if(snake_x == NC){
    snake_x = 0;
  }
  if(snake_y == NL){
    snake_y = 0;
  }
  if(snake_x == -1){
    snake_x = NC - 1;
  }
  if(snake_y == -1){
    snake_y = NL -1;
  }
}

function snake_walk(){
  if(frameCount - timer > 5){
    timer = frameCount;
    snake_x += snake_vx;
    snake_y += snake_vy;
  }
}

function draw() {
  snake_walk();
  snake_loop();

  if(snake_x == food_x && snake_y == food_y){
    snake_color = food_color;
    food_generate();
    food_count += 1;

    tempoFALTA = 5;
  }

  background(255);
  draw_mat();
  draw_cell(snake_x, snake_y, snake_color);

  draw_cell(food_x, food_y, food_color);

  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(food_count, 25, 35);

  textAlign(RIGHT);
  textSize(20);
  text(tempoFALTA + "s", NC * lado - 10, 35);

  count_reset()
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    snake_vx = -1;
    snake_vy = 0;
  }else if(keyCode === RIGHT_ARROW){
    snake_vx = 1;
    snake_vy = 0;
  }else if(keyCode === UP_ARROW){
    snake_vx = 0;
    snake_vy = -1;
  }else if(keyCode === DOWN_ARROW){
    snake_vx = 0;
    snake_vy = 1;
  }
}