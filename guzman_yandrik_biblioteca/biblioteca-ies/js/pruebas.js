// R1
console.assert(valoracionMedia(LIBROS[9]) === 4.8, "R1: Matilda 4.8");
console.assert(valoracionMedia(LIBROS[2]) === null, "R1: sin valoraciones, null");

// R2
console.assert(librosDisponibles(LIBROS).length === 8, "R2: 8 disponibles");
console.assert(librosDisponibles([]).length === 0, "R2: array vacío");

// R3
console.assert(librosEntre(LIBROS, "1950", "1960").length === 4, "R3: 1950-1960 son 4");
console.assert(librosEntre(LIBROS, "abc", 2000).length === 0, "R3: año no válido");
console.assert(librosEntre(LIBROS, 2000, 1900).length === 0, "R3: desde mayor que hasta");

// R4
console.assert(generos(LIBROS).length === 5, "R4: 5 géneros");
console.assert(generos(LIBROS)[0] === "Ciencia ficción", "R4: empieza por Ciencia ficción");
console.assert(generos([]).length === 0, "R4: array vacío");

// R5
console.assert(librosPorAutor(LIBROS).get("Isaac Asimov") === 2, "R5: Asimov tiene 2");
console.assert(librosPorAutor([]).size === 0, "R5: array vacío");

// R6
console.assert(ranking(LIBROS)[0].titulo === "Matilda", "R6: primero Matilda");
console.assert(ranking(LIBROS).length === 3, "R6: por defecto 3");
console.assert(ranking(LIBROS, 50).length === 12, "R6: n mayor que el total");
console.assert(ranking([]).length === 0, "R6: array vacío");

// R7
console.assert(resumen(LIBROS).total === 13, "R7: total 13");
console.assert(resumen(LIBROS).mediaGlobal === 4.4, "R7: media global 4.4");
console.assert(resumen(LIBROS).masAntiguo === "La Celestina", "R7: más antiguo");
console.assert(resumen([]).total === 0, "R7: array vacío, total 0");
console.assert(resumen([]).masAntiguo === null, "R7: array vacío, masAntiguo null");

// Salida de librosDisponibles
console.table(librosDisponibles(LIBROS));