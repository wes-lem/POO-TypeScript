abstract class FormaGeometrica{
    nome: string;

    constructor(nome:string){
        this.nome = nome;
    }

    abstract getArea() :number;
}

class Quadrado extends FormaGeometrica{
    private lado: number;
    constructor(lado: number){
        super("quadrado");
        this.lado = lado;
    }

    getArea(): number {
        return this.lado * this.lado;
    }
}

class Circulo extends FormaGeometrica{
    private raio: number;

    constructor(raio: number){
        super("Circulo");
        this.raio = raio;
    }

    getArea(): number {
        return Math.PI * this.raio;
    }
}

let formas: FormaGeometrica[] = [];

formas.push(new Quadrado(10));
formas.push(new Circulo(5));