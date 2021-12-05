import { stringify } from "querystring";

let show = (lista: any[]) => console.log("["+lista.join(", ") + "]");

let lista: Array<number> = [3,-1,2,3,-5,4,-7,5,9,0];
lista.sort(); // compara os elementos convertidos para texto
// lista.reverse();
show(lista);

//criando a própria função de ordenação
function compare_to(a: number, b: number):number{
    if(a < b){ //valor a deve vir primeiro
        return -1; //qualquer valor negativo
    }else if(a > b){//valor a deve vir depois
        return 1; 
    }else{ //são iguais
        return 0;
    }
} 

lista.sort(compare_to);
show(lista);

//simplificando o uso de arrow functions
lista.sort((a,b) => a - b);
show(lista);

lista.sort((a,b) => b - a);
show(lista);

// "".localeCompare(""); //comparação local

// comparando independente do valor absoluto
lista.sort((a, b) => Math.abs(a) - Math.abs(b));
show(lista);



// ordenação de texto
let nomes: Array<string> = ["João", "Maria", "José", "Pedro", "Zeca"];
nomes.sort();
show(nomes);

//invertendo ordenação
nomes.sort((a,b)=> -a.localeCompare(b));
show(nomes);



//ordenando objetos
class Pessoa{
    //simplificação do constructor
    constructor(public nome : string, public idade : number) {}
    public toString():string{
        return this.nome + ":" + this.idade;
    }
}

let pessoas: Array<Pessoa> = [new Pessoa("João",30), new Pessoa("João",10),
                              new Pessoa("José",30), new Pessoa("Pedro",10),
                              new Pessoa("Zeca",30), new Pessoa("Bruno",10)];

pessoas.sort();
show(pessoas); //se usado sem nenhum parâmetro, cai converter para string e comparar as strings

//apenas pelo nome
pessoas.sort((a,b) => b.idade - a.idade);
show(pessoas);

//nome e idade
pessoas.sort((a, b)=> a.nome.localeCompare(b.nome) || a.idade - b.idade);