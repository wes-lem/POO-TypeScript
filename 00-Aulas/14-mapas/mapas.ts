let alunos = new Map<number, string>(); //ES6

alunos.set(3456, "fco");
alunos.set(5132, "ana");
alunos.set(1194, "fabio");
alunos.set(1194, "andre");

alunos.has(1678);  //nao
alunos.has(5132);  //true

console.log(alunos.size);

let valor = 1194;
if (alunos.has(valor)){
    console.log(alunos.get(valor));
}else{
    console.log("não existe");
}

alunos.delete(5132);
console.log(alunos.size);

// //1. Iterate over map keys
// for(let key of alunos.keys()){
//     console.log(key); //3456 5132 1194
// }

// function compare_to_int(a: number, b: number){
//     return a - b;
// }

// let keys = [...alunos.keys()].sort((a,b) => a - b);

// for(let key of alunos.keys()){
//     console.log(key);
// }

// //2. Iterate over map values



// //3. Iterate over map entries
// for(let entry of alunos.entries()){
//     console.log(entry);
// }