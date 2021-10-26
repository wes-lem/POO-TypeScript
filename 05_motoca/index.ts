// function getRandomInt(min,max){
//     min = Math.min(min);
//     max = Math.max(max);
//     return Math.floor(Math.random() * (max - min)) + min;
// }

// class Pessoa{
//     age: number;
//     name: string;

//     constructor(age: number, name: string){
//         this.age = age;
//         this.name = name;
//     }

//     toString():string{
//         return this.age+" : "+this.name;
//     }
// }

// class Moto{
//     pessoa: Pessoa | null;
//     potencia: number;
//     tempo: number;

//     constructor(potencia:number){
//         this.pessoa = null;
//         this.potencia = potencia;
//         this.tempo = 0;
//     }

//     subir(criança: Pessoa):boolean{
//         if(this.pessoa != null){
//             console.log("fail: moto ocupada.");
//             return false;
//         }

//         this.pessoa = criança; 
//         console.log(criança.name+", de "+criança.age+" anos, subiu na motoca");
//         return true;
//     }

//     descer(){
//         if(this.pessoa == null){
//             console.log("Não tem nenhuma crinça nessa motoca.");
//             return false;
//         }

//         console.log(this.pessoa.name+" desceu da motoca.");
//         this.pessoa = null;
//     }

//     comprar(tempo: number){
//         this.tempo += tempo;
//     }

//     dirigir(tempo: number){
//         if(this.pessoa == null){
//             console.log("fail: não há criança na motoca.");
//             return;
//         }
//         if(this.pessoa.age <= 10 && this.tempo > 0){
//             if(tempo > this.tempo){
//                 console.log("fail: andou "+this.tempo+" min e acabou o tempo.");
//                 this.tempo = 0;
//                 return;
//             }

//             console.log(this.pessoa.name+" andou "+this.tempo+" min de motoca!")
//             this.tempo -= tempo;
//             return;
//         }

//         if(this.tempo == 0){
//             console.log("fail: tempo zerado");
//         }
//         if(this.pessoa.age > 10){
//             console.log("fail: "+this.pessoa.name+" é muito grande para andar de moto.");
//         }
//     }

//     buzinar(){
//         let aux: string = "p";
//         for(let i = 0; i < this.potencia; i++){
//             aux += "e";
//         }
//         return aux + "m";
//     }

//     toString():string{
//         if(this.pessoa == null){
//             return "Potência: "+this.potencia+", Minutos: "+this.tempo+", Pessoa: [ "+this.pessoa+" ]";
//         }
//         return "Potência: "+this.potencia+", Minutos: "+this.tempo+", Pessoa: ["+this.pessoa.toString()+"]";
//         // return this.pessoa+" : "+this.potencia+" : "+this.tempo;
//     }
// }

// let humano: Pessoa = new Pessoa(10, "Weslem");
// let humano2: Pessoa = new Pessoa(10, "Fernanda");
// let moto1: Moto = new Moto(5);

// moto1.subir(humano);
// moto1.comprar(20);
// moto1.dirigir(10);

// // moto1.subir(humano2);
// moto1.dirigir(10);

// console.log(moto1.buzinar());
// console.log(moto1.toString());