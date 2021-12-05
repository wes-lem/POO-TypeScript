let cadeiras: Map<number, string> = new Map<number, string>();
cadeiras.set(3, "bruno");
cadeiras.set(2, "weslem");
cadeiras.set(1, "david");
cadeiras.set(8, "fernanda");

console.log(cadeiras.has(3));
console.log(cadeiras.get(3));