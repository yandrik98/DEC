//1. Devolvemos un nuevo array aplicándole a los elementos de un array que le pasemos, una función que establezcamos.
const original = [3, 8, 1, 6];

function transformar(array, fn) {
  const array2 = [];
  for (let i = 0; i < array.length; i++) {
    array2[i] = fn(array[i]);
  }
  return array2;
}

//2. Devolvemos un nuevo array con los elementos de un array que le pasemos pero que cumplan una condición que establezcamos
function quedarse(array, condicion) {
  const array2 = [];
  for (let i = 0; i < array.length; i++) {
    if (condicion(array[i])) {
      array2.push(array[i]);
    }
  }
  return array2;
}

//3. Probamos las funciones realizadas
console.log(transformar(original, (x) => x * 2));
console.log(quedarse(original, (x) => x % 2 === 0));

//4.Lo reescribimos con map y filter

const duplicado = original.map((x) => 2 * x);
console.log(duplicado);
const pares = original.filter((x) => x % 2 === 0);
console.log(pares);

//5.
const precios = [12, 45, 8, 99, 30];
const total = precios.filter((x) => x > 10).reduce((acu, x) => acu + (x + x * 0.21), 0).toFixed(2);
