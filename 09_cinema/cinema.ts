class Cliente{
    id: string;
    telefone: number;

    constructor(id: string, telefone: number){
        this.id = id;
        this.telefone = telefone;
    }

    public toString():string{
        return this.id+":"+this.telefone;
    }
}

class Cinema{
    cadeiras: Cliente[] | null;

    constructor(qtd:number){
        this.cadeiras = [];

        for(let i = 0; i < qtd; i++){
            this.cadeiras.push(null);
        }
    }

    indexOf(id: String): number{
        return this.cadeiras.findIndex(c => c != null && c.id == id);

        // for(let i = 0; i < this.cadeiras.length; i++){
        //     let cad = this.cadeiras[i];
        //     if(cad != null && cad.id == id){
        //         return i;
        //     }
        // }
        // return -1;
    }

    reservar(pessoa: Cliente, cadeira:number):boolean{
        if(cadeira > this.cadeiras.length || cadeira < 0){
            console.log("fail: número da cadeira inexistente");
            return false;
        }
        if(this.cadeiras[cadeira] != null){
            console.log("fail: cadeira ja esta ocupada");
            return false;
        }

        if(this.indexOf(pessoa.id) != -1){
            console.log("Você já está na cadeira!");
            return false;
        }

        this.cadeiras[cadeira] = pessoa;
        return true;

        // for(let i = 0; i < this.cadeiras.length; i++){
        //     if(this.cadeiras[i] == pessoa){
        //         console.log("fail: cliente ja esta no cinema");
        //         return false;
        //     }

            
        // }
    }

    cancelar(id:string):boolean{
        let posicao = this.indexOf(id);
        if (posicao == -1){
            this.cadeiras[posicao] = null;
            return true;
        }
        console.log("fail: cliente nao esta no cinema");
        return false
    }

    public toString():string{
        let str = "[ ";
            for(let i = 0; i < this.cadeiras.length; i++){
            if(this.cadeiras[i] == null){
                str += "- "
            }else{
                str += this.cadeiras[i].toString() + " ";
            }
        }
        str += "]";
        return str;
    }
}

let cinema = new Cinema(2);
let cliente1 = new Cliente("Weslem", 5454);
let cliente2 = new Cliente("Fernanda", 8383);
let cliente3 = new Cliente("Vanessa", 1010);
// console.log(cliente1.toString());

cinema.reservar(cliente1, 0);
cinema.reservar(cliente2, 1);
console.log(cinema.toString());
cinema.cancelar("Fernanda");
console.log(cinema.toString());

// cinema.reservar(cliente3, 1);
// console.log(cinema.toString());

// cinema = new Cinema(3);
// console.log(cinema.toString());

// let lista = [1,2,3,4,5,6,7,8];
// console.log(lista.indexOf(4));
