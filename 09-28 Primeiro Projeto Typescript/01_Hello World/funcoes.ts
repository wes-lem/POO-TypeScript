// Função JavaScript
//function adicionar(a, b){
//    return a + b;
//}

//Funções em TypeScript
function adicionar(a:number, b:number):number{
    return a + b;
}
console.log(adicionar(2,3));

// Função anônima
let adicionar1 = function (a:number,b:number):number{
    return a+b;
}
console.log(adicionar1(3,4));

// Arrow function
let adicionar2 = (a:number, b:number):number => {
    return a + b;
}
console.log(adicionar2(4,5));

// Função curta
let adicionar3 = (a:number, b:number):number => (a + b);
console.log(adicionar3(5,6));