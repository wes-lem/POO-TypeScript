class Pessoa{
    age: number;
    name: string;

    constructor(age: number, name: string){
        this.age = age;
        this.name = name;
    }

    toString(){
        return this.age+" : "+this.name;
    }
}

class Moto{
    pessoa: Pessoa | null;
    potencia: number;
    tempo: number;

    constructor(){
        this.pessoa = null;
        this.potencia = 1;
        this.tempo = 0;
    }

    iniciar(potencia: number){
        this.potencia = potencia;
    }

    subir(criança: Pessoa){
        if(this.pessoa != null){
            console.log("fail: moto ocupada.");
            return;
        }

        this.pessoa = criança; 
        console.log(criança.name+", de "+criança.age+" anos, subiu na motoca");
    }

    descer(){
        if(this.pessoa == null){
            console.log("Não tem nenhuma crinça nessa motoca.");
            return;
        }

        console.log(this.pessoa.name+" desceu da motoca.");
        this.pessoa = null;
    }

    comprar(tempo: number){
        this.tempo += tempo;
    }

    dirigir(tempo: number){
        if(this.pessoa == null){
            console.log("fail: não há criança na motoca.");
        }
        if(this.pessoa.age <= 10 && this.tempo > 0){
            if(tempo > this.tempo){
                console.log("fail: andou "+this.tempo+" min e acabou o tempo.");
                this.tempo = 0;
                return;
            }

            console.log(this.pessoa.name+" andou "+this.tempo+" min de motoca!")
            this.tempo -= tempo;
            return;
        }

        if(this.tempo == 0){
            console.log("fail: tempo zerado");
        }
        if(this.pessoa.age > 10){
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

    toString(){
        if(this.pessoa == null){
            return "Potência: "+this.potencia+", Minutos: "+this.tempo+", Pessoa: [ "+this.pessoa+" ]";
        }
        return "Potência: "+this.potencia+", Minutos: "+this.tempo+", Pessoa: ["+this.pessoa.toString()+"]";
        // return this.pessoa+" : "+this.potencia+" : "+this.tempo;
    }
}

let humano: Pessoa = new Pessoa(10, "Weslem");
let humano2: Pessoa = new Pessoa(10, "Fernanda");
let moto1: Moto = new Moto();

moto1.subir(humano);
moto1.comprar(20);
moto1.iniciar(10);
moto1.dirigir(10);
moto1.descer();

moto1.subir(humano2);
moto1.dirigir(10);

console.log(moto1.buzinar());