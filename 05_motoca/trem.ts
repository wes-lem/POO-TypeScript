class Kid{
    age: number;
    name: string;

    constructor(age: number, name: string){
        this.age = age;
        this.name = name;
    }

    toString():string{
        return this.age+" : "+this.name;
    }
}

class Trem{
    pessoas: Kid[];
    potencia: number;
    tempo: number;
    lotacao:number;

    constructor(potencia:number, lotacao: number){
        this.pessoas = []; // new Array<Pessoa>();
        this.potencia = potencia;
        this.tempo = 0;
        this.lotacao = lotacao;
    }

    subir(criança: Kid):boolean{
        if(this.pessoas.length == this.lotacao){
            console.log("trem cheio");
            return false;
        }

        this.pessoas.push(criança); 
        console.log(criança.name+", de "+criança.age+" anos, subiu no trem");
        return true;
    }

    descer(){
        if(this.pessoas.length == 0){
            console.log("Trem vazio");
            return null;
        }

        console.log(this.pessoas[this.lotacao].name+" desceu do trem");
        return this.pessoas.pop();
    }

    comprar(tempo: number){
        this.tempo += tempo;
    }

    dirigir(tempo: number){
        if(this.pessoas.length == 0){
            console.log("Trem vazio");
            return;
        }
        if(this.pessoas[0].age < 5){
            if(tempo > this.tempo){
                console.log("Criança muito pequena pra dirigir o trem.");
                this.tempo = 0;
                return;
            }

            console.log(this.pessoas.name+" andou "+this.tempo+" min de motoca!")
            this.tempo -= tempo;
            return;
        }

        if(this.tempo == 0){
            console.log("fail: tempo zerado");
        }
        if(this.pessoas.age > 10){
            console.log("fail: "+this.pessoa.name+" é muito grande para andar de moto.");
        }
    }

    buzinar(){
        let aux: string = "p";
        for(let i = 0; i < this.potencia; i++){
            aux += "e";
        }
        return aux + "m";
    }

    toString():string{
        if(this.pessoas.length == 0){
            return "Potência: "+this.potencia+", Minutos: "+this.tempo+", Pessoa: [ "+this.pessoas+" ]";
        }

        let saida = `(${this.pessoas[0].name}) [ `;
        for(let i = 1; i < this.pessoas.length; i++){
            saida += `${this.pessoas[i].name}`
        }
        return "Potência: "+this.potencia+", Minutos: "+this.tempo+", Pessoas: ["+this.pessoas.toString()+"]";
        // return this.pessoa+" : "+this.potencia+" : "+this.tempo;
    }
}

let humano: Kid = new Kid(10, "Weslem");
let humano2: Kid = new Kid(10, "Fernanda");
let moto1: Trem = new Trem(5,10);

moto1.subir(humano);
moto1.comprar(20);
moto1.dirigir(10);

// moto1.subir(humano2);
moto1.dirigir(10);

console.log(moto1.buzinar());
console.log(moto1.toString());