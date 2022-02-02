class Grafite{
    calibre: number;
    dureza: string;
    tamanho: number;

    constructor(calibre: number, dureza: string, tamanho: number){
        this.calibre = calibre;
        this.dureza = dureza;
        this.tamanho = tamanho;
    }

    gastoPorFolha():number{
        if(this.dureza === "HB"){
            return 1;
        }
        if(this.dureza === "2B"){
            return 2;
        }
        if(this.dureza === "4B"){
            return 4;
        }
        if(this.dureza === "6B"){
            return 6;
        }
        return 0;
    }
    
    toString():string{
        // return "Grafite: " +this.calibre+":"+this.dureza+"+"+this.tamanho;
        return `Grafite: ${this.calibre} ${this.dureza} ${this.tamanho}`;
    }
}

class Lapiseira {
    private calibre: number;
    private tambor: Array<Grafite>;

    constructor(calibre: number){
        this.calibre = calibre;
        this.tambor = [];
    }

    public setGrafite(grafite: Grafite): boolean{
        if(this.tambor.length > 5){
            console.log("A lapiseira já possui um grafite");
            return false;
        }
        if(grafite.calibre != this.calibre){
            console.log("O grafite não é compativel com a lapiseira");
            return false;
        }
        if(grafite.calibre != this.calibre){
            console.log("O grafite não é compativel com a lapiseira");
            return false;
        }

        this.tambor.push(grafite);
        return true;
    }

    removerGrafite(): Grafite | null{
        if(this.tambor == null){
            console.log("A lapiseira não possui um grafite");
            return null;
        }

        let grafite = this.tambor.shift();
        if(grafite == null){
            return null;
        }
        return grafite;
    }

    escrever(folhas: number): boolean | void {
        //verificar se existe grafite
        if (this.tambor.length == 0) {
            console.log("A lapiseira não possui um grafite");
            return false;
        }
        let gasto = this.tambor[0].gastoPorFolha() * folhas;

        if (gasto <= this.tambor[0].tamanho) {
            console.log("Escrita concluída.");
            this.tambor[0].tamanho -= gasto;
            if (this.tambor[0].tamanho == 0){
                this.removerGrafite();
                console.log("Tiramos o grafite acabado.")
                return true;
            }
            return true;
        } else if (this.tambor[0].tamanho != 0){
            let realizado = this.tambor[0].tamanho / this.tambor[0].gastoPorFolha();
            console.log("Escrita parcial: " + realizado + " folhas");
            this.tambor[0].tamanho = 0;
            if (this.tambor[0].tamanho == 0){
                this.removerGrafite();
                console.log("Tiramos o grafite acabado.")
                return true;
            }
            return true;
        }
    }

    toString(){
        return 
    }
}

let pentel = new Lapiseira(0.5);
pentel.setGrafite(new Grafite(0.5, "HB", 40));
pentel.setGrafite(new Grafite(0.5, "2B", 80));
pentel.setGrafite(new Grafite(0.5, "4B", 50));
console.log(pentel);

pentel.escrever(40);
pentel.escrever(10);
pentel.escrever(50);
pentel.escrever(60);
pentel.escrever(70);
console.log(pentel);