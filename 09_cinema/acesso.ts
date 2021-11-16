class Carro {
    gas: number;
    gasMax: number;

    setGas(value: number){
        if(value < 0){
            this.gas = 0;
        }else if(value > this.gasMax){
            this.gas = this.gasMax;
        }else{
            this.gas = value;
        }
    }
}

class Conta{
    private id: number;
    private saldo: number;

    constructor(id: number, saldo: number){
        this.id = id;
        this.saldo = saldo;
    }

    public getSaldo():number{
        return this.saldo;
    }

    public getId():number{
        return this.id;
    }

    public setId(id: number):void{
        if(id > 0){
            this.id = id;
        }
    }

    depositar(valor: number){
        this.saldo += valor;
    }

    sacar(valor: number){
        this.saldo -= valor;
    }
}

let conta = new Conta(1, 400);
conta.sacar(10);
conta.setId(2);
conta.depositar(1000);
console.log(conta.getSaldo());

console.log(conta.getId());