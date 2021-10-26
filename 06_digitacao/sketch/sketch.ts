let windowX = 800;
let windowY = 600;

class Bubble{
  x: number;
  y: number;
  letter: string;
  speed: number;

  static radius: number = 20;
  alive: boolean = true;

  constructor(x:number, y:number, letter:string, speed:number){
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.speed = speed;
  }

  update(): void{
    this.y += this.speed;
  }

  draw():void{
    fill(255);
    stroke(255);
    circle(this.x, this.y, Bubble.radius * 2);

    fill(0);
    stroke(0);
    textSize(15);
    textAlign(CENTER)
    text(this.letter, this.x - 5, this.y + 5);
  }
}

class Board{
  bubbles: Bubble[] = [];
  timeout: number = 30;
  timer: number = 0;
  hits = 0;
  mistakes = 0;

  constructor(){
    this.bubbles = [new Bubble(100, 100, "a", 1)];
    this.bubbles.push(new Bubble(200, 100, "b", 2));
    this.bubbles.push(new Bubble(300, 100, "c", 3));
  }

  update(): void{
    this.checkBubbleTime();
    this.markOutsideBubbles();

    for(let bubble of this.bubbles){
      bubble.update();
    }
    this.removeDeadBubbles();
  }

  removeDeadBubbles(){
    this.bubbles = this.bubbles.filter(b => b.alive);
    // let vivas: Bubble[] = [];
    // for(let bubble of this.bubbles){
    //   if(bubble.alive){
    //     vivas.push(bubble);
    //   }
    //   this.bubbles = vivas;
    // }
  }

  removeByHit(code:number){
    for(let bubble of this.bubbles){
      if(bubble.letter[0].toUpperCase().charCodeAt(0) == code){
        bubble.alive = false;
        this.hits++;
        break;
      }else{
        this.mistakes++;
        break;
      }
    }
  }

  checkBubbleTime():void{
    this.timer -= 1;
    if(this.timer <= 0){
      this.addBubble();
      this.timer = this.timeout;
    }
  }

  markOutsideBubbles(){
    for(let bubble of this.bubbles){
      if(bubble.y + 2 * Bubble.radius >= height){
        bubble.alive = false;
        this.mistakes++;
      }
    }
  }

  addBubble(){
    let x = random(0, width - 2 * Bubble.radius);
    let y = -2 * Bubble.radius;
    let letter = random(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]);
    let speed = random(1,5);

    let bubble = new Bubble(x, y, letter, speed);
    this.bubbles.push(bubble);
  }

  draw(): void{
    stroke("white");
    fill("white");
    textSize(30);
    
    textAlign(CENTER);
    text("hits: "+this.hits+" | erros: "+this.mistakes+" | faltam: "+this.bubbles.length, windowX / 2,50);

    for(let bubble of this.bubbles){
      bubble.draw();
    }
  }
}

class Game{
  board: Board;
  activeState:() => void;

  constructor(){
    this.board = new Board();
    this.activeState = this.gamePlay;
  }


  gamePlay():void{
    this.board.update();
    background(50, 50, 50);
    this.board.draw();

    if(this.board.mistakes > 5){
      this.activeState = this.gameOver;
    }
  }

  gameOver(){
    background(255, 0, 0);
    fill(0);
    textSize(100);
    text("Game Over", windowX / 2, windowY / 2);
  }
}

let game: Game;

function setup(){
  createCanvas(windowX, windowY);
  frameRate(30);
  game = new Game ();
}

function keyPressed(){
  game.board.removeByHit(keyCode);
}

function draw(){
  game.activeState();
}