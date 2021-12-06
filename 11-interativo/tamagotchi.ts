// npm install readline-sync @types/readline-sync @types/node

// const readline = require('readline-sync');
// let input = () =>  readline.question("");
// let write = (x: any) => process.stdout.write("" + x);

// console.log("Digite seu nome");
// let nome = input();
// console.log("Olá meu amigo "+nome);

class Pett{
    private nome: string;
    private idade: number;
    private alive: boolean;
    private limpMax: number;
    private dinheiro: number;
    private energia: number;
    private energiaMax: number;
    private fome: number;
    private fomeMax: number;
    private limpeza: number;

    constructor(nome:string, energiaMax: number, fomeMax: number, limpMax: number){
        this.nome = nome
        this.idade = 0;
        this.alive = true;
        this.limpMax = limpMax;
        this.dinheiro = 0;
        this.energia = energiaMax;
        this.fome = fomeMax;
        this.fomeMax = fomeMax;
        this.limpeza = limpMax;
        this.energiaMax = energiaMax;
    }

    public setNome(nome: string){
        if(nome.length == 0){
            this.nome = "bichinho";
        }else{
            this.nome = nome;
        }
    }

    public getNome(){
        return this.nome;
    }

    public getLimpeza(){
        return this.limpeza;
    }public getLimpMax(){
        return this.limpMax;
    }public getEnergia(){
        return this.limpeza;
    }public getEnergiaMax(){
        return this.energiaMax;
    }public getFome(){
        return this.fome;
    }public getFomeMax(){
        return this.fomeMax;
    }
    
    public setLimpeza(valor: number){
        if(valor + this.limpeza > this.limpMax){
            this.limpeza = this.limpMax;
        }

        this.limpeza += valor;
    }

    public setEnergia(valor: number){
        if(valor + this.energia > this.energiaMax){
            this.energia = this.energiaMax;
        }

        this.energia += valor;
    }

    public setFome(valor: number){
        if(valor + this.fome > this.fomeMax){
            this.fome= this.fomeMax;
        }

        this.fome += valor;
    }



    verificarVivo(){
        if(this.energia <= 0){
            this.energia = 0;
            this.alive = false;
            console.log("fail: pet morreu de fraqueza.");
            return false
        }
        if(this.fome <= 0){
            this.fome = 0;
            this.alive = false;
            console.log("fail: pet morreu de fome.");
            return false
        }if(this.limpeza <= 0){
            this.limpeza = 0;
            this.alive = false;
            console.log("fail: pet morreu de sujeira.");
            return false
        }

        return true;
    }

    brincar(){
        if(this.alive == false){
            console.log("fail: pet está morto.");
            return false;
        }

        // $play" altera em -2 energia, -1 saciedade, -3 limpeza, +1 diamante, +1 idade.
        this.energia -= 2;
        this.fome -= 1;
        this.limpeza -= 3;
        this.dinheiro += 1;
        this.idade += 1;

        this.verificarVivo();
        return true;
    }

    comer(){
        if(this.alive == false){
            console.log("fail: pet está morto.");
            return false;
        }

        if(this.fome >= this.fomeMax){
            this.energia -= 1;
            this.limpeza -= 2;
            this.idade += 1;
            this.fome = this.fomeMax;
            return;
        }

        // $eat" altera em -1 a energia, +4 a saciedade, -2 a limpeza, +0 diamantes,  +1 a idade
        this.energia -= 1;
        this.fome += 4;
        this.limpeza -= 2;
        this.idade += 1;

        this.verificarVivo();
        return true;
    }

    dormir(){
        if(this.alive == false){
            console.log("fail: pet está morto.");
            return false;
        }
        if(this.energia > this.energiaMax - 5){
            console.log("fail: nao esta com sono.");
            return false;
        }

        // $sleep" aumenta energia até o máximo e idade aumenta do número de turnos que o pet dormiu.
        while(this.energia < this.energiaMax){
            this.energia += 1;
            this.idade += 1;
        }

        this.verificarVivo();
        return true;
    }

    banhar(){
        if(this.alive == false){
            console.log("fail: pet está morto.");
            return false;
        }

        // $clean" alteram em -3 energia, -1 na saciedade, MAX na limpeza, +0 diamantes, +2 na idade.
        this.energia -= 3;
        this.fome -= 1;
        this.limpeza = this.limpMax;
        this.idade += 2;

        this.verificarVivo();
        return true;
    }

    toString(): string{
        return this.nome + "\nE:"+this.energia+"/"+this.energiaMax+", S:"+this.fome+"/"+this.fomeMax+", L:"+this.limpeza+"/"+this.limpMax+", D:"+this.dinheiro+", I:"+this.idade+"\n";
    }
}

// class IO{
//     createPet(): Pett{
//         write("Digite o nome do seu pet: ");
//         let nome = input();
//         write("Digite energia: ");
//         let energia = input();
//         write("Digite saciedade: ");
//         let saciedade = input();
//         write("Digite limpeza: ");
//         let limpeza = input();
    
//         let pet = new Pett(nome, energia, saciedade, limpeza);
    
//         return pet;
//     }
    
//     mostrarHelp(){
//         write("Comandos:\n");
//         write(" init <nome> <energia> <fome> <limpeza>: cria um novo pet\n");
//         write(" show: mostra o pet\n");
//         write(" play: faz o pet brincar\n");
//         write(" eat: faz o pet comer\n");
//         write(" sleep: faz o pet dormir\n");
//         write(" shower: faz o pet tomar banho\n");
//         write(" end: sai do programa\n");

//     }

//     shell(){
//         let pet = this.createPet();

//         while(true){
//             write("! ");
//             let line = input();
//             let words = line.split(" ");

//             if(words[0] == "end"){
//                 break;
//             }else if(words[0] == "init"){
//                 let nome = words[1];
//                 let energ = words[2]
//                 let sacMac = words[3];
//                 let limp = words[4];
//                 pet = new Pett(nome, energ, sacMac, limp);
//             }else if(words[0] == "show"){
//                 write("" + pet.toString());
//             }else if(words[0] == "help"){
//                 this.mostrarHelp();
//             }else if(words[0] == "play"){
//                 pet.brincar();
//             }else if(words[0] == "eat"){
//                 pet.comer();
//             }else if(words[0] == "sleep"){
//                 pet.dormir();
//             }else if(words[0] == "shower"){
//                 pet.banhar();
//             }else{
//                 console.log("Comando inválido.");
//             }
//         }
//     }
// }

// let io = new IO();
// io.shell();
