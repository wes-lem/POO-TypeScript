class Entity{
  x:number; //atributos
  y:number;
  image: p5.Image;
  step: number;

  //parâmetros
  constructor(x:number, y:number, step:number, image: p5.Image){
    this.x = x;
    this.y = y;
    this.step = step;
    this.image = image;
  }
  //metodos
  draw(): void{
    image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
  }
}

class Board{
  nl: number;
  nc: number;
  step: number;
  background: p5.Image;

  constructor(nc: number, nl: number, step: number, background: p5.Image){
    this.nl = nl;
    this.nc = nc;
    this.step = step
    this.background = background;
  }

  draw(): void{
    image(this.background, 0, 0, this.nc * this.step, this.nl * this.step);
    for(let x = 0; x < this.nc; x++){
      for(let y = 0; y < this.nl; y++){
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(x * this.step, y * this.step, this.step, this.step);
      } 
    }
  }
}

let size = 100;

let x: number = 0;
let y: number = 0;
let step: number = 100;

let fox_img: p5.Image;
let foxr_img: p5.Image;
let fox_sit_img: p5.Image;
let fox_sitr_img: p5.Image;

let chiken_img: p5.Image;
let chiken_fried_img: p5.Image;

let board_img: p5.Image;
// let baga_img: p5.Image;

let fox: Entity;
let chiken: Entity;
let board: Board;

// let baga: Entity;

// function criarbaga(){
//   baga.x = chiken.x;
//   baga.y = chiken.y;
  
//   if(keyCode === " ".charCodeAt(0)){
//     baga = new Entity(baga.x, baga.x, size, baga_img);
//     baga.draw();
//   }
// }

function mobs_loop(){
  if(chiken.x == board.nc){
    chiken.x = 0;
  }
  if(chiken.y == board.nl){
    chiken.y = 0;
  }
  if(chiken.x == -1){
    chiken.x = board.nc - 1;
  }
  if(chiken.y == -1){
    chiken.y = board.nl - 1;
  }

  if(fox.x == board.nc){
    fox.x = board.nc - 1;
  }
  if(fox.y == board.nl){
    fox.y = board.nl - 1;
  }
  if(fox.x == -1){
    fox.x = 0;
  }
  if(fox.y == -1){
    fox.y = 0;
  }
}

function friedChiken(){
  if(fox.x == chiken.x && fox.y == chiken.y){
    chiken.image = chiken_fried_img;
    fox.image = fox_sit_img;
  }
}

function loadImage(path: string): p5.Image{
  return loadImage(
    path,
    () => console.log("Loading " + path + " ok "),
    () => console.log("Loading " + path + " error ")
  );
}

function preload(){
  fox_img = loadImage("../sketch/fox.png");
  chiken_img = loadImage("../sketch/chiken.png");
  board_img = loadImage("../sketch/chao.jpg");

  chiken_fried_img = loadImage("../sketch/friedchiken.png");
  foxr_img = loadImage("../sketch/foxr.png");
  fox_sit_img = loadImage("../sketch/fox_sit.png");
  fox_sitr_img = loadImage("../sketch/fox_sitr.png");
  // baga_img = loadImage("../sketch/baga.png");
}

function keyPressed(){
  // Raposa
  if(keyCode === LEFT_ARROW){
    fox.x--;

    if(fox.image == fox_sit_img || fox.image == fox_sitr_img){
      fox.image = fox_sit_img;
    }else{
      fox.image = fox_img;
    }
    
  }else if(keyCode === RIGHT_ARROW){
    fox.x++;

    if(fox.image == fox_sit_img || fox.image == fox_sitr_img){
      fox.image = fox_sitr_img;
    }else{
      fox.image = foxr_img;
    }
    
  }else if(keyCode === UP_ARROW){
    fox.y--;
  }else if(keyCode === DOWN_ARROW){
    fox.y++;
  }

  // Galinha
  if(chiken.image == chiken_fried_img){

  }else{
    if(keyCode === "A".charCodeAt(0)){
      chiken.x--;
    }else if(keyCode === "D".charCodeAt(0)){
      chiken.x++;
    }else if(keyCode === "W".charCodeAt(0)){
      chiken.y--;
    }else if(keyCode === "S".charCodeAt(0)){
      chiken.y++;
    }
  }
}

function setup(){
  board = new Board(7, 7, size, board_img);
  fox = new Entity(1, 1, size, fox_img);
  chiken = new Entity(2,2, size, chiken_img);

  createCanvas(board.nc * size, board.nl * size);
}

function draw(){
  mobs_loop();
  friedChiken();
  
  board.draw();
  chiken.draw();
  fox.draw();

  // criarbaga();
}