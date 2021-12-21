class Animal{
    private alive: boolean = true;
    private type: string = "";

    constructor(type: string){
        this.type = type;
    }

    public isAlive():boolean{
        return this.alive;
    }
    public kill():void{
        this.alive = false;
        console.log("matando "+this.type);
    }

    getType(){
        return this.type;
    }

    toString(){
        return this.type + ":" + (this.alive ? "alive" : "dead");
    }
}

class Pet extends Animal{
    protected nome: string;

    public constructor(nome: string, type: string){
        super(type);
        this.nome = nome;
    }

    public brincar(){
        if(this.isAlive()){
            console.log("brincando com o "+this.nome);
        }else{
            console.log("Por favor, me enterre!");
        }
    }

    public toString(): string {
        return this.nome + ":" + super.toString();
    }
}

class Gato extends Pet{
    private vidas: number;

    constructor(nome: string, vidas: number){
        super(nome, "gato");
        this.vidas = vidas;
    }

    public lamber(){
        if(this.isAlive()){
            console.log("lambering")
        }
    }

    public kill(){
        if(!this.isAlive()){
            console.log("Este gato está morto");
        }else if(this.vidas > 1){
            console.log("Perdeu uma vida.");
            this.vidas--;
        }else{ //tem 1 vida
            this.vidas = 0;
            super.kill();
        }
    }

    public brincar(): void {
        if(this.isAlive()){
            console.log("brincando com "+this.nome);
        }else{
            console.log("Espero estar empalhado");
        }
    }

    public toString(): string {
        return super.toString() + ":" +this.vidas;
    }
}


function main(){
    let saco: Animal[] = [];
    saco.push(new Animal("Cachorro"));
    saco.push(new Pet("Totó", "cachorro"));
    saco.push(new Gato("Chiquinha", 4));
    saco.push(new Gato("Lilo", 2));

    while(saco.length > 1){
        for(let animal of saco){
            animal.kill();
        }
        // saco.forEach(animal => animal.kill());
        saco = saco.filter(animal => animal.isAlive());
    }

    let sobrevivente: Animal = saco[0];
    if(sobrevivente instanceof Gato){
        let gato: Gato = <Gato>sobrevivente;
        gato.lamber();
        gato.kill();
    }
    console.log(saco[0].toString());
}

main();