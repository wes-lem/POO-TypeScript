class Pessoa{
    constructor(public nome: string){ }
}

class Cinema{
    cadeiras: Map<number, Pessoa>;
    nomes: Map<string, number>;

    constructor(public lotacao: number){
        this.cadeiras = new Map<number, Pessoa>();
        this.nomes = new Map<string, number>();
    }

    procurarChave(nome: string): number{
        for(let [chave, pessoa] of this.cadeiras){
            if(pessoa.nome == nome){
                return chave;
            }
        }
        return -1;
    }

    reservar(chave: number, pessoa:Pessoa){
        if(this.cadeiras.has(chave)){
            console.log("Posicao ocupada");
            return
        }
        if(this.nomes.has(pessoa.nome)){
            console.log("a pessoa ja esta no cinema");
            return;
        }

        this.cadeiras.set(chave, pessoa);
        this.nomes.set(pessoa.nome, chave);
    }

    cancelar(nome:string){
        if(!this.nomes.has(nome)){
            console.log("Pessoa não encontrada");
            return
        }
        let chave = this.nomes.get(nome);

    }

    public toString(){
        let saida = "";
        for(let i = 0; i < this.lotacao; i++){
            if(this.cadeiras.has(i)){
                let pessoa = this.cadeiras.get(i);
                saida += pessoa.nome += " ";
            }else{
                saida +="- ";
            }
        }
    }
}