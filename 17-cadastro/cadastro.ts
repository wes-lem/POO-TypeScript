class Conta{
    protected saldo: number;
    constructor(protected id: number, protected nomeCliente: string, private tipo: string){
        this.saldo = 0;
    }

    public depositar(quantia: number){
        this.saldo += quantia;
    }

    public transferir(destino: Conta, valor: number){
        if(this.saldo == 0)
            throw new Error("Você não tem dinheiro nessa conta");
        if(this.saldo < valor)
            throw new Error("Saldo insuficiente para transferência");

        this.saldo -= valor;
        destino.depositar(valor);
    }

    public sacar(valor: number){
        if(this.saldo < valor)
            throw new Error("Saldo insuficiente");
        
        this.saldo -= valor;
    }

    public updateMensal(){
        if(this.tipo == "CP"){
            this.saldo += this.saldo * 0.01;
            return;
        }
        if(this.tipo == "CC"){
            this.saldo -= 20;
            return;
        }
    }

    public verSaldo = () => this.saldo;
    public getId = () => this.id;
    public getClienteId = () => this.nomeCliente;
    public getTipo = () => this.tipo;

    public toString(): string{
        return this.id+":"+this.nomeCliente+":"+this.saldo+":"+this.tipo
    }
}

class Cliente{
    private contas: Array<Conta>;
    constructor(private nome: string){
        this.contas = new Array<Conta>();
    }

    public addConta(contas: Array<Conta>){
        for(let conta of contas){
            this.contas.push(conta);
        }
    }

    public getContaByTipo(tipo: string): Conta{
        let saida: undefined | Conta;
        for(let conta of this.contas){
            if(conta.getTipo() == tipo){
                saida = conta;
            }
        }

        if(saida == undefined)
            throw new Error("O clinte não tem esse tipo de conta");
        
        return saida;
    }

    public updateMensal(){
        this.contas.map(a => a.updateMensal());
    }

    public toString(){
        return this.contas.map(a => a.toString()).join("\n");
    }
}

class Banco{
    private contas: Map<number, Conta>;
    private clientes: Map<string, Cliente>;
    private nextId: number;
    constructor(){
        this.contas = new Map<number, Conta>();
        this.clientes = new Map<string, Cliente>();
        this.nextId = 0;
    }

    public addCliente(nome: string){
        this.contas.set(this.nextId, new Conta(this.nextId, nome, "CC"));
        let cc: undefined | Conta = this.contas.get(this.nextId);
        if(cc == undefined)
            return;
        this.nextId++;
        
        this.contas.set(this.nextId, new Conta(this.nextId, nome, "CP"));
        let cp: undefined | Conta = this.contas.get(this.nextId);
        if(cp == undefined)
            return;
        this.nextId++;

        this.clientes.set(nome, new Cliente(nome));
        
        let cliente: undefined | Cliente = this.clientes.get(nome);
        if(cliente == undefined)
            return;
        
        cliente.addConta([cc, cp]);
    }

    public updateMensal(){
        let clintes = Array.from(this.clientes.values()).map(a => a.updateMensal());
    }

    public getClienteById(nome: string): Cliente{
        let cliente: undefined | Cliente = this.clientes.get(nome);

        if(cliente == undefined){
            throw new Error("Cliente não possui contas no banco")
        }
        return cliente;
    }

    public toString(): string{
        let str = "";
        let clientes = Array.from(this.clientes.values());
        str += clientes.map(a => a.toString()).join("\n");
        return str;
    }
}

try{
let nubank = new Banco();
nubank.addCliente("Weslem");
nubank.addCliente("Sena");

let weslem = nubank.getClienteById("Weslem");
let sena = nubank.getClienteById("Sena");
let senacc = sena.getContaByTipo("CC");
let wescc = weslem.getContaByTipo("CC");
let wescp = weslem.getContaByTipo("CP");


wescc.depositar(100);
wescc.transferir(wescp, 40);
wescc.transferir(senacc, 20);

console.log(nubank.toString()+"\n\nUpdate:\n");

nubank.updateMensal();

console.log(nubank.toString());

} catch (e) {
    console.log((<Error>e).message);
}