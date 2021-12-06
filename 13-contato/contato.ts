// npm install readline-sync @types/readline-sync @types/node

const readline = require('readline-sync');
let input = () =>  readline.question("");
let write = (x: any) => process.stdout.write("" + x);

class Fone{
    constructor(private label: string, private number: string){ }

    public static validate(number: string):boolean{
        let valid = "0123456789()-.";
        for (let i = 0; i < number.length; i++) {
            if (valid.indexOf(number[i]) == -1) {
                return false;
            }
        }
        return true
    }

    public isValid():boolean{
        if(Fone.validate(this.number) == false){
            console.log("Número inválido");
            return false;
        }else{
            return true;
        }
    }

    public getLabel(){
        return this.label;
    }
    public getNumber(){
        return this.number
    }
    public setNumber(number: string){
        if(Fone.validate(number) == true){
            this.number = number;
        }else{
            console.log("fail: número inválido");
        }
        
    }
    public setLabel(label: string){
        this.label = label;
    }

    toString():string{
        return this.label+":"+this.number;
    }
}

class Contato {
    //private fones: Array<Fone>;
    private nome: string;
    private fones: Array<Fone>;
    constructor(nome: string, fones:Array<Fone>) {
        this.nome = nome;
        this.fones = new Array<Fone>();
        for (let fone of fones) {
            this.addFone(fone);
        }
    }

    //valida o fone e insere se for válido
    addFone(fone: Fone) {
        if(fone.isValid() == true){
            this.fones.push(fone);
        }else{
            console.log("fail: número inválido.");
        }
    }

    removeFone(index: number) {
        //verificar se o index é válido antes de remover
        if(index <= this.fones.length && index >= 0){
            this.fones.splice(index, 1);
        }else{
            console.log("fail: índice inválido.");
        }
        
    }

    setFones(fones: Array<Fone>) {
        this.fones = [];
        for(let fone of fones) {
            this.addFone(fone);
        }
    }
    setNome(nome: string){
        this.nome = nome;
    }

    getFones():Array<Fone>{
        return this.fones;
    }
    getName(){
        return this.nome;
    }

    public toString(): string {
        let str = "";
        str += this.nome;
        for(let i = 0; i < this.fones.length; i++){
            str += " ["+i+":";
            str += this.fones[i].getLabel()+":"+this.fones[i].getNumber();
            str += "]";
        }
        return str;
        // return this.nome + ": " + this.fones.join(", ");
    }
}

class IO{
    createContato():Contato{
        write("Digite nome do contato: ");
        let nome = input();

        write("Label do telefone: ");
        let label = input();

        write("Número do telefone: ");
        let numero = input();

        let fones = [new Fone(label, numero)];
        let telefone = new Contato(nome, fones);

        return telefone;
    }
    
    mostrarHelp(){
        write("Comandos:\n");
        // write(" init <nome> <energia> <fome> <limpeza>: cria um novo pet\n");
        write(" show: mostra contato\n");
        write(" add <label> <número>: adiciona telefone\n");
        write(" remove <index>: remove telefone pelo índice\n");
        write(" setFone <quatidade>: seta telefones do contato\n");
    }

    shell(){
        let telefone = this.createContato();

        while(true){
            write("! ");
            let line = input();
            let words = line.split(" ");

            if(words[0] == "end"){
                break;
            }else if(words[0] == "help"){
                this.mostrarHelp();
            }else if(words[0] == "show"){
                write(telefone.toString()+"\n");
            }else if(words[0] == "add"){
                telefone.addFone(new Fone(words[1], words[2]))
            }else if(words[0] == "remove"){
                telefone.removeFone(words[1]);
            }else if(words[0] == "setFone"){
                let fones = [];
                for(let i = 0; i < words[1]; i++){
                    let label,numero;
                    let ind = i+1;
                    write("Digite o label do "+ind+"° contato: ");
                    label = input();
                    write("Digite o número do "+ind+"° contato: ");
                    numero = input();

                    fones.push(new Fone(label, numero));
                }

                telefone.setFones(fones);
            }else{
                console.log("Comando inválido.");
            }
        }
    }
}

let io = new IO();
io.shell();

