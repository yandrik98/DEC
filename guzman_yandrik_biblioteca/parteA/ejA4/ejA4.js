const inscripciones = [
  "ana@ies.es",
  "luis@ies.es",
  "ANA@ies.es",
  "marta@ies.es",
  "luis@ies.es",
  "pablo@ies.es",
  "Marta@ies.es",
];
console.log(inscripciones);

// 1. Usamos Set para obtener los correos sin repetir
let inscripcionesSinRepetir = new Set(inscripciones);
console.log(inscripcionesSinRepetir);

//Vacío el Set para realizar los siguientes ejercicios
inscripcionesSinRepetir.clear();

//2. Establecemos en minúsculas los correos y lo metemos en un array
let inscripciones2 = [];
for (let i = 0; i < inscripciones.length; i++) {
  inscripciones2[i] = inscripciones[i].toLowerCase();
}
console.log(inscripciones2);

//Establecemos el Set para quitarnos duplicados
inscripcionesSinRepetir = new Set(inscripciones2);
console.log(inscripcionesSinRepetir);

//3. Creamos un Map para hacer el recuento de los correos repetidos
const recuento = new Map();
for (const correo of inscripciones2) {
  const apariciones = recuento.get(correo) ?? 0; //devuelve el valor de la clave(correo), y si no está en el Map se usa 0.
  recuento.set(correo, apariciones + 1); //Metemos dentro del Map, la clave que será el correo y el valor que será el números de apariciones.
}
for (const [correo, apariciones] of recuento) {
  console.log(`${correo} → ${apariciones}`);
}

//4. Convertimos el Set del apartado 2 en un array ordenado alfabéticamente
let inscripcionesSinRepetirOrdenado = [...inscripcionesSinRepetir].sort();
console.log(inscripcionesSinRepetirOrdenado);
