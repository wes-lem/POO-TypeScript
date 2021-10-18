
class Car{
    pass: number;
    maxPass: number;
    fuel: number;
    maxFuel: number
    km: number;

    constructor(maxPass: number, maxFuel: number){
        this.pass = 0;
        this.maxPass = maxPass;
        this.fuel = 0;
        this. maxFuel = maxFuel;
        this.km = 0;
    }

    addPass(n: number): void{
        if(this.pass + n <= this.maxPass){
            this.pass += n;
        }else{
            console.log("Gasolina insuficiente.")
        }
    }

    addFuel(n: number):void{
        this.fuel += n;
        if(this.fuel >= this.maxFuel){

        }
    }

    dirigir(distancia: number): void{
        if(this.pass > 0 && this.fuel >= distancia){
            this.km += distancia;
            this.fuel -= distancia;

            console.log("Passeando pela rua parecendo um picolé");
        }else{
            console.log("Não foi posível adicionar mais passageiros");
        }
    }
}

function somar2(a:number, b:number):number | string{
    let c = a + b;
    if(c == 8){
        return "8 é lindo, hoje vou jogar no peru";
    }
    return c;
}

let c = somar2(5,6);

let monza: Car; // Referência
monza = new Car(5,40);  // Instancia

monza.addPass(2); // Método
monza.addFuel(10);
monza.dirigir(10);

let parati = new Car(4,50);
