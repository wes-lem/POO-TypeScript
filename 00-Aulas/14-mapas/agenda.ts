class Contato{
    constructor(public nome: string){ }
}
class Agenda{
    contatos: Map<string, Contato>;

    Agenda(){
        this.contatos = new Map<string, Contato>();
    }

    adiciona(contato: Contato){
        if(this.contatos.has(contato.nome)){
            let existente = this.contatos.get(contato.nome);
            // for(let fone of contato.fones){
            //     existente.addFone(fone);
            // }
        }else{
            this.contatos.set(contato.nome, contato);
        }
    }

    findContato(nome: string): Contato | null{
        if(this.contatos.has(nome)){
            return this.contatos.get(nome);
        }
        return null;
    }

    rm(nome:string){
        if(this.contatos.delete(nome)){
            return true;
        }
        return false;
    }

    lista(){
        return this.contatos;
    }

    // findByPattern(pattern): Array<Contato>{
    //     let result = new Array<Contato>(){
    //         if(contato.nome.includes(pattern)){

    //         }
    //     }
    // }
}