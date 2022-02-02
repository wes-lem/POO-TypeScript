function depositar(conta:any, valor:number):void{
    conta.saldo += valor;
}

function sacar(conta:any, valor:number):boolean{
    if(valor <= conta.saldo){
        conta.saldo -= valor;
        return true;
    }else{
        console.log("Saque não autorizado: Saldo insuficiente.");
        return false;
    }
}

function criarConta(nome_titular:any, saldo_inicial:number){
    return{
        "nome_titular": nome_titular,
        "saldo": saldo_inicial,
    }
}

let conta = {
    "nome_titular": "Weslem",
    "saldo": 0,
}

depositar(conta, 10);
console.log(conta.saldo);

sacar(conta, 5);
console.log(conta.saldo);

sacar(conta, 15);
console.log(conta.saldo);

let conta1 = criarConta("Fernanda", 1000);

sacar(conta1, 10);
console.log(conta1.saldo);

let conta2 = criarConta("Vanessa", 2);
console.log(conta2);