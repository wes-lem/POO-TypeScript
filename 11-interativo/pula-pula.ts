const readline = require('readline-sync');
let input = () =>  readline.question("");
let write = (x: any) => process.stdout.write("" + x);

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
    // maxCrianca: number;
    filaEspera: Crianca[];
    trampolim: Crianca[] | null;

    constructor(/*maxCrianca: number*/){
        // this.maxCrianca = maxCrianca;
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

// console.log(trampolim1.toString());
// trampolim1.entrar();
// console.log(trampolim1.toString());
// trampolim1.sair();
// console.log(trampolim1.toString());
// trampolim1.sair();
// console.log(trampolim1.toString());

class IOO{
    createTrampolim(): Trampolim{
        let trampolim = new Trampolim();
        return trampolim;
    }

    createCrianca(): Crianca{
        write("Digite nome da criança: ");
        let nome = input();
        write("Idade: ");
        let idade = input();

        let crianca = new Crianca(nome, idade);

        return crianca;
    }
    
    mostrarHelp(){
        write("Comandos:\n");
        write(" init <nome> <idade>: cria criança\n");
        write(" show: mostra o trampolim e fila de espera\n");
        write(" entrar: coloca criança no pula-pula\n");
        write(" sair: coloca criança na fila de espera\n");
        write(" end: sai do programa\n");

    }

    shell(){
        let trampolim = this.createTrampolim();
        let crianca1 = this.createCrianca();
        trampolim.chegou(crianca1);

        while(true){
            write("! ");
            let line = input();
            let words = line.split(" ");

            if(words[0] == "end"){
                break;
            }else if(words[0] == "init"){
                let nome = words[1];
                let idade = words[2]
                
                let crianca = new Crianca(nome, idade);
                trampolim.chegou(crianca);
            }else if(words[0] == "show"){
                write("" + trampolim.toString()+"\n");
            }else if(words[0] == "help"){
                this.mostrarHelp();
            }else if(words[0] == "entrar"){
                trampolim.entrar();
            }else if(words[0] == "sair"){
                trampolim.sair();
            }else{
                console.log("Comando inválido.");
            }
        }
    }
}

let ioo = new IOO();
ioo.shell();

// let trampolim1 = new Trampolim();
// trampolim1.chegou(new Crianca("Alice",4));
// trampolim1.chegou(new Crianca("Luquinhas",5));

// trampolim1.entrar();