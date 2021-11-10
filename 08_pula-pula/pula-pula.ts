class Crianca{
    nome: string;
    idade: number;

    constructor(nome: string, idade: number){
        this.nome = nome;
        this.idade = idade;
    }

    toString(){
        return this.nome+":"+this.idade;
    }
}

class Trampolim{
    maxCrianca: number;
    filaEspera: Crianca[];
    trampolim: Crianca[] | null;

    constructor(/*maxCrianca: number*/){
        // maxCrianca = maxCrianca;
        this.filaEspera = [];
        this.trampolim = [];

        // for(let i = 0; i < this.maxCrianca; i++){
        //     this.trampolim.push(null);
        // }
    }

    chegou(crianca: Crianca){
        this.filaEspera.push(crianca);
    }

    entrar():boolean{
        if(this.filaEspera == null){
            console.log("erro: não há crinça na fila.");
            return false;
        }

        this.trampolim.push(this.filaEspera.shift());
        return true;
    }

    sair():boolean{
        if(this.trampolim == null){
            console.log("erro: não há crinça na no trampolim.");
            return false;
        }

        this.filaEspera.push(this.trampolim.shift());
        return true;
    }

    toString(){
        let str = "";
        for(let i = 0; i < this.filaEspera.length; i++){
            if(this.filaEspera[i] == null){
                str += "---- "
            }else{
                str += this.filaEspera[i].toString() + " ";
            }
        }

        str += "=> [ "
        for(let i = 0; i < this.trampolim.length; i++){
            if(this.trampolim[i] == null){
                str += "---- ";
            }else{
                str += this.trampolim[i].toString() + " ";
            }
        }
        str += "]"
        return str;
    }
}

let trampolim1 = new Trampolim(/*4*/);
trampolim1.chegou(new Crianca("Alice",4));
trampolim1.chegou(new Crianca("Luquinhas",5));

console.log(trampolim1.toString());
trampolim1.entrar();
console.log(trampolim1.toString());
trampolim1.entrar();
console.log(trampolim1.toString());
trampolim1.sair();
console.log(trampolim1.toString());
trampolim1.sair();
console.log(trampolim1.toString());