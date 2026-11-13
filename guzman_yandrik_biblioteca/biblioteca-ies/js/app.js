"use strict";

// ---------------------------------------------------------------------------
// FUNCIÓN DE APOYO (ya hecha, no la modifiques)
// Inserta un texto HTML dentro del elemento indicado por su selector CSS.
// Cómo funciona por dentro se estudiará en las unidades de objetos predefinidos
// y DOM. Por ahora, úsala como una "caja negra":
//   mostrar("#catalogo", "<p>Hola</p>");
// ---------------------------------------------------------------------------
function mostrar(selector, html) {
  document.querySelector(selector).innerHTML = html;
}

// ---------------------------------------------------------------------------
// R1 a R7: funciones de cálculo (no deben usar mostrar ni console.log)
// ---------------------------------------------------------------------------

// R1
/* Cálculo de la media de las valoraciones de un libro
Recibe un libro, si no tiene valoraciones devuelve null y si las tiene, las suma,
divide la media entre la longitud del array de valoraciones, lo pasa a decimal 
pero al convertirse en texto lo pasamos a Number para que sea número*/
function valoracionMedia(libro) {
  if (libro.valoraciones.length === 0) {
    return null;
  } else {
    const suma = libro.valoraciones.reduce((acu, x) => acu + x, 0);
    return Number((suma / libro.valoraciones.length).toFixed(1));
  }
}
// R2
/*Filtro de los libros disponibles.
Pasamos un array con los libros y establecemos un filtro para que dentro 
de un nuevo array meta solo aquellos libros donde la propiedad prestado
sea false */
function librosDisponibles(libros) {
  const disponibles = libros.filter((x) => x.prestado === false);
  return disponibles;
}

// R3
/*Devuelve un array con libros publicados entre dos años, ambos incluidos.
Recibe un array de libros, una fecha inicial y una fecha final.
Devuelve un array vacío en caso que alguno de los parámetros que le pasemos 
no sea válido o si desde es mayor que hasta, en caso de que lo anterior no se 
produzca devuelve el array con el filtro de fechas*/
function librosEntre(libros, desde, hasta) {
  const inicio = Number(desde);
  const final = Number(hasta);
  if (Number.isNaN(inicio) || Number.isNaN(final) || inicio > final) {
    const arrayVacio = [];
    return arrayVacio;
  } else {
    return libros.filter((x) => x.anio >= inicio && x.anio <= final);
  }
}

// R4
/*Obtiene los distintos géneros sin repeticiones y ordenados alfabéticamente.
Recibe el array de libros y devuelve un array con los géneros sin repetir.*/
function generos(libros) {
  const generos = [...new Set(libros.map((x) => x.genero))].sort();
  return generos;
}

// R5
/*Recorre el array de libros y cuenta las apariciones de cada autor
Recibe el array de libros y devuelve un Map con el nombre del autor y sus apariciones
*/
function librosPorAutor(libros) {
  const recuento = new Map();
  libros.forEach((x) => {
    const autor = x.autor;
    const apariciones = recuento.get(autor) ?? 0;
    recuento.set(autor, apariciones + 1);
  });
  return recuento;
}

// R6
/*Obtiene los libros con mejores media de valoraciones, de mayor a menor.
Recibe un array de libros y cantidad que tiene que devolver, por defecto 3
Devuelve un array nuevo con n libros con las mejores medias de valoraciones y 
descartando los que no tienen valoraciones, y si hay empate ordena alfabeticamente
por titulo */
function ranking(libros, n = 3) {
  const conValoraciones = libros.filter(
    (libro) => valoracionMedia(libro) !== null,
  );
  const ordenados = conValoraciones.sort(
    (a, b) =>
      valoracionMedia(b) - valoracionMedia(a) ||
      a.titulo.localeCompare(b.titulo),
  );
  return ordenados.slice(0, n);
}
// R7
/*Devuelve varias propiedades de la biblioteca
Recibe el array de libros. Devuelve un objeto con el total de libros,
los prestados, los disponibles, la media global de todas las valoraciones
con un decimal y el título del libro más antiguo.*/
function resumen(libros) {
  if (libros.length === 0) {
    return {
      total: 0,
      prestados: 0,
      disponibles: 0,
      mediaGlobal: null,
      masAntiguo: null,
    };
  }
  const total = libros.length;
  const prestados = libros.filter((x) => x.prestado === true).length;
  const disponibles = librosDisponibles(libros).length;
  //Media global:
  let sumaValoraciones = 0;
  let cantidadValoraciones = 0;
  libros.forEach((libro) => {
    libro.valoraciones.forEach((valor) => {
      sumaValoraciones += valor;
      cantidadValoraciones++;
    });
  });
  const mediaGlobal =
    Math.round((sumaValoraciones / cantidadValoraciones) * 10) / 10;
  let libroAntiguo = libros[0];
  libros.forEach((libro) => {
    if (libro.anio < libroAntiguo.anio) {
      libroAntiguo = libro;
    }
  });
  const masAntiguo = libroAntiguo.titulo;
  return { total, prestados, disponibles, mediaGlobal, masAntiguo };
}

// ---------------------------------------------------------------------------
// R8: funciones que generan HTML (devuelven un string)
// ---------------------------------------------------------------------------
/*Genera la tabla HTML 
Recibe el array de libros. Devuelve la tabla*/
function tablaLibros(libros) {
  const filas = libros.map(
    (libro) => `
    <tr class="${libro.prestado ? "prestado" : ""}">
      <td>${libro.titulo}</td>
      <td>${libro.autor}</td>
      <td>${libro.genero}</td>
      <td>${libro.anio}</td>
      <td>${valoracionMedia(libro) ?? "Sin valorar"}</td>
      <td>${libro.prestado ? "Prestado" : "Disponible"}</td>
    </tr>`,
  );
  return `<table>${filas.join("")}</table>`;
}

/*Génera la lista de géneros
Recibe un array de géneros, devuelve una lista*/
function listaGeneros(listado) {
  const lineas = listado.map((genero) => `<li>${genero}</li>`);
  return `<ul>${lineas.join("")}</ul>`;
}

/*Lista numerada del ranking
Recibe el array de libros ya ordenado. Devuelve la lista*/
function listaRanking(libros) {
  const lineas = libros.map(
    (libro) =>
      `<li>${libro.titulo} (${valoracionMedia(libro) ?? "Sin valorar"})</li>`,
  );
  return `<ol>${lineas.join("")}</ol>`;
}

/*Genera la lista del resumen
Recibe el objeto generado en resumen y devuelve una lista*/

function htmlResumen(o) {
  return `
    <ul>
      <li>Total: ${o.total}</li>
      <li>Prestados: ${o.prestados}</li>
      <li>Disponibles: ${o.disponibles}</li>
      <li>Media global: ${o.mediaGlobal}</li>
      <li>Más antiguo: ${o.masAntiguo}</li>
    </ul>`;
}
/*Genera la lista de libros por autor, recibe un map de autores con el número de libros y devuelve una lista*/
function listaAutores(autores) {
  const lineas = [...autores].map(
    ([autor, cantidad]) => `<li>${autor}: ${cantidad}</li>`,
  );
  return `<ul>${lineas.join("")}</ul>`;
}
// ---------------------------------------------------------------------------
// Programa principal
// ---------------------------------------------------------------------------
mostrar("#catalogo", tablaLibros(LIBROS));
mostrar("#generos", listaGeneros(generos(LIBROS)));
mostrar("#ranking", listaRanking(ranking(LIBROS)));
mostrar("#resumen", htmlResumen(resumen(LIBROS)));
mostrar("#autores", listaAutores(librosPorAutor(LIBROS)));
