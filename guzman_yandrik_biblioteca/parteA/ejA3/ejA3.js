const notas = [7.5, 4.9, 10, 5, 6.25, 3, 8.8, 11, 9];
let cont = 1;
for (let i = 0; i < notas.length; i++) {
  let calificacion = "Nota no válida";
  if (notas[i] >= 0 && notas[i] < 5) {
    calificacion = "Insuficiente";
  }
  if (notas[i] >= 5 && notas[i] < 6) {
    calificacion = "Suficiente";
  }
  if (notas[i] >= 6 && notas[i] < 7) {
    calificacion = "Bien";
  }
  if (notas[i] >= 7 && notas[i] < 9) {
    calificacion = "Notable";
  }
  if (notas[i] >= 9 && notas[i] <= 10) {
    calificacion = "Sobresaliente";
  }
  console.log(`Alumno ${cont}: ${notas[i]} → ${calificacion}`);
  cont++;
}
let aprobados = 0;
let sumaMedia = 0;
let contMedia = 0;
let mayorNota = 0;
for (const nota of notas) {
  if (nota >= 0 && nota <= 10) {
    sumaMedia = sumaMedia + nota;
    contMedia++;
    if (nota >= 5) {
      aprobados++;
    }
    if (mayorNota < nota) {
      mayorNota = nota;
    }
  }
}
const media = sumaMedia / contMedia;
console.log(`El número de aprobados es ${aprobados}`);
console.log(`La media de las notas válidas es ${media}`);
console.log(`La nota más alta es: ${mayorNota}`);
