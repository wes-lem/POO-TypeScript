abstract class Pessoa{
    constructor(private nome: string, private idade: number){ }

    getNome(){
        return this.nome;      
    }
    getIdade(){
        return this.idade;      
    }
    
    abstract aula(): string;

    toString(): string{
        return this.nome+":"+this.idade;
    }
}

class Estudante extends Pessoa{
    constructor(nome: string, idade: number, private id: number, private semestre: number){
        super(nome,idade);
    }

    getSemestre(){
        return this.semestre;
    }

    aula(): string{
        return "Aluno assistindo aula";
    }

    toString(): string{
        return super.toString()+":"+this.id+":"+this.semestre;
    }
}

class Professor extends Pessoa{
    constructor(nome: string,idade: number, private disciplina: string){
        super(nome,idade);
    }

    aula(): string{
        return "Professor ministrando aula";
    }

    toString(): string{
        return super.toString()+":"+this.disciplina;
    }
}

let estudante = new Estudante("Weslem", 20, 499281, 4);
let professor = new Professor("David Sena", 30, "POO DD");

console.log(estudante.toString());
console.log(professor.toString());

console.log(estudante.aula());
console.log(professor.aula());