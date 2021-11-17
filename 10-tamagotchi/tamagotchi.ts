class Pet{
    private idade: number;
    private alive: boolean;
    private limpMax: number;
    private dinheiro: number;
    private energia: number;
    private energiaMax: number;
    private fome: number;
    private fomeMax: number;
    private limpeza: number;

    constructor(energiaMax: number, fomeMax: number, limpMax: number){
        this.idade = 0;
        this.alive = true;
        this.limpMax = limpMax;
        this.dinheiro = 0;
        this.energia = energiaMax;
        this.fome = fomeMax;
        this.fomeMax = fomeMax;
        this.limpeza = limpMax;
        this.energiaMax = energiaMax;
    }

    getLimpeza(){
        return this.limpeza;
    }getLimpMax(){
        return this.limpMax;
    }getEnergia(){
        return this.limpeza;
    }getEnergiaMax(){
        return this.energiaMax;
    }getFome(){
        return this.fome;
    }getFomeMax(){
        return this.fomeMax;
    }
    
    setLimpeza(valor: number){
        if(valor + this.limpeza > this.limpMax){
            this.limpeza = this.limpMax;
        }

        this.limpeza += valor;
    }

    setEnergia(valor: number){
        if(valor + this.energia > this.energiaMax){
            this.energia = this.energiaMax;
        }

        this.energia += valor;
    }

    setFome(valor: number){
        if(valor + this.fome > this.fomeMax){
            this.fome= this.fomeMax;
        }

        this.fome += valor;
    }



    verificarVivo(){
        if(this.energia <= 0){
            this.energia = 0;
            this.alive = false;
            console.log("fail: pet morreu de fraqueza.");
            return false
        }
        if(this.fome <= 0){
            this.fome = 0;
            this.alive = false;
            console.log("fail: pet morreu de fome.");
            return false
        }if(this.limpeza <= 0){
            this.limpeza = 0;
            this.alive = false;
            console.log("fail: pet morreu de sujeira.");
            return false
        }

        return true;
    }

    brincar(){
        if(this.alive == false){
            console.log("fail: pet está morto.");
            return false;
        }

        // $play" altera em -2 energia, -1 saciedade, -3 limpeza, +1 diamante, +1 idade.
        this.energia -= 2;
        this.fome -= 1;
        this.limpeza -= 3;
        this.dinheiro += 1;
        this.idade += 1;

        this.verificarVivo();
        return true;
    }

    comer(){
        if(this.alive == false){
            console.log("fail: pet está morto.");
            return false;
        }

        // $eat" altera em -1 a energia, +4 a saciedade, -2 a limpeza, +0 diamantes,  +1 a idade
        this.energia -= 1;
        this.fome += 4;
        this.limpeza -= 2;
        this.idade += 1;

        this.verificarVivo();
        return true;
    }

    dormir(){
        if(this.alive == false){
            console.log("fail: pet está morto.");
            return false;
        }
        if(this.energia > this.energiaMax - 5){
            console.log("fail: nao esta com sono.");
            return false;
        }

        // $sleep" aumenta energia até o máximo e idade aumenta do número de turnos que o pet dormiu.
        while(this.energia < this.energiaMax){
            this.energia += 1;
            this.idade += 1;
        }

        this.verificarVivo();
        return true;
    }

    banhar(){
        if(this.alive == false){
            console.log("fail: pet está morto.");
            return false;
        }

        // $clean" alteram em -3 energia, -1 na saciedade, MAX na limpeza, +0 diamantes, +2 na idade.
        this.energia -= 3;
        this.fome -= 1;
        this.limpeza = this.limpMax;
        this.idade += 2;

        this.verificarVivo();
        return true;
    }

    toString(): string{
        return "E:"+this.energia+"/"+this.energiaMax+", S:"+this.fome+"/"+this.fomeMax+", L:"+this.limpeza+"/"+this.limpMax+", D:"+this.dinheiro+", I:"+this.idade;
    }
}

let bigode = new Pet(5,10,10);

console.log(bigode.toString());
bigode.brincar();
bigode.brincar();
bigode.brincar();

// Morto
bigode.brincar();
console.log(bigode.toString());

console.log(bigode.getEnergia());