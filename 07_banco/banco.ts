class Pessoa {
    nome: string;
    constructor(nome: string) {
        this.nome = nome;
    }
    public toString() {
        return this.nome;
    }
}

class Banco {
    caixas: Array<Pessoa | null>;
    espera: Array<Pessoa>;

    constructor(qtdCaixas: number) {
        this.caixas = []; //length 0
        for (let i = 0; i < qtdCaixas; i++) {
            this.caixas.push(null);
        }
        this.espera = [];
    }


    chegarPessoa(pessoa: Pessoa){
        this.espera.push(pessoa);
    }

    //se o caixa estiver vazio chama a próxima pessoa da lista de espera
    chamarCaixa(caixa: number):boolean{
        if(this.caixas[caixa] !== null || this.espera == null || this.caixas.length < caixa){
            return false;
        }

        this.caixas[caixa] = this.espera.shift();
        return true;
    }

    //finalizar atendimento
    finalizar(caixa: number): Pessoa | null{
        if(this.caixas.length < caixa){
            return null;
        }

        let vaiSair = this.caixas[caixa];
        this.caixas[caixa] = null;
        return vaiSair;
    }

    removerPorNome(nome: string){
        for(let i = 0; i < this.caixas.length; i++){
            let pessoa = this.caixas[i];
            if(pessoa != null && pessoa.nome == nome){
                this.caixas[i] = null;
                return pessoa;
            }
            if(pessoa.nome == nome){
                this.espera.splice(i, 1);
                return Pessoa;
            }
        }
    }

    public toString() {
        let str = "caixas: | ";
        for (let i = 0; i < this.caixas.length; i++) {
            let pessoa = this.caixas[i];
            str += i + ": ";
            //str += pessoa !== null ? pessoa.toString : "----";
            if (pessoa == null) {
                str += "----";
            } else {
                str += pessoa.toString();
            }
            str += " |";
        }
        str += "\nespera: ";
        for (let pessoa of this.espera) {
            str += pessoa.toString() + " ";
        }
        return str;
    }
}

let banco = new Banco(3);

banco.chegarPessoa(new Pessoa("Weslem"));
banco.chegarPessoa(new Pessoa("David"));
banco.chegarPessoa(new Pessoa("Fernanda"));


banco.chamarCaixa(0);
console.log(banco.toString());
banco.chamarCaixa(1);
console.log(banco.toString());

banco.finalizar(1);
console.log(banco.toString());
