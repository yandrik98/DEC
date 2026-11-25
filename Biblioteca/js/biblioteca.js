import { Libro } from "./libro.js";
/**
 * Representa una biblioteca
 */
export class Biblioteca
{
  /**
   * Crea una biblioteca vacía
   */
  constructor()
  {
    this.libros = [];
  }
  /**
   * Agrega un libro a la biblioteca
   * @param {Libro} libro libro que pasamos para que se agregue
   * @returns {boolean} true si se añadió el libro, false si no era un Libro
   */
  agregar(libro)
  {
    if (!(libro instanceof Libro)) {
      return false;
    }
    else {
      this.libros.push(libro);
      return true;
    }
  }
  /**
   * Busca libros cuyo autor o título contenga el texto, sin distinguir mayúsculas
   * @param {string} texto
   * @returns {Libro[]} array con los libros con los que coincida el texto
   */
  buscar(texto)
  {
    const textoMinuscula = texto.toLowerCase();
    return this.libros.filter(
      (l) =>
        l.titulo.toLowerCase().includes(textoMinuscula) ||
        l.autor.toLowerCase().includes(textoMinuscula),
    );
  }
  /**
   * Filtrar los libros por género
   * @param {string} genero
   * @returns {Libro[]} devuelve un array con los libros que tienen ese genero
   */
  filtrarPorGenero(genero)
  {
    const generoMinuscula = genero.toLowerCase();
    return this.libros.filter(
      (l) => l.genero.toLowerCase() === generoMinuscula,
    );
  }
  /**
   * Filtrar los libros por disponibilidad
   * @param {boolean} disponible
   * @returns {Libro[]} devuelve un array donde solo estarán los disponibles o los que no
   */
  filtrarPorDisponibilidad(disponible)
  {
    return this.libros.filter((l) => l.disponible === disponible);
  }
  /**
   * Ordena libros por un campo que le pasemos sin modificar el array original
   * @param {"titulo"|"autor"|"anio"|"paginas"} campo
   * @param {boolean} [ascendente=true]
   * @returns {Libro[]} Copia ordenada del array de libros
   */
  ordenarPor(campo, ascendente = true)
  {
    const bibliotecaOrdenada = [...this.libros];
    bibliotecaOrdenada.sort((a, b) => {
      if (campo === "titulo") {
        return ascendente ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo);
      } 
      else if (campo === "autor") {
        return ascendente ? a.autor.localeCompare(b.autor) : b.autor.localeCompare(a.autor);
      } 
      else if (campo === "anio") {
        return ascendente ? a.anio - b.anio : b.anio - a.anio;
      } 
      else if (campo === "paginas") {
        return ascendente ? a.paginas - b.paginas : b.paginas - a.paginas;
      }
    });
    return bibliotecaOrdenada;
  }
  /**
   * Devuelve los géneros del catálogo sin repetir.
   * @returns {string[]} Lista de géneros.
   */
  generos()
  {
    const todos = this.libros.map((l) => l.genero);
    const sinDuplicados = new Set(todos);
    const arraySinDuplicados = [...sinDuplicados];
    return arraySinDuplicados;
  }
  /**
   * Crea libros a partir de un texto con una línea por libro y campos separados por ;
   * Cada línea: titulo;autor;anio;paginas;genero;si|no
   * @param {string} texto Texto con los libros.
   * @returns {number} Número de libros añadidos.
   */
  cargarDesdeTexto(texto) 
  {
    let añadidos = 0;
    for (const linea of texto.split("\n")) 
      {
        if (linea.trim() === "") 
        {
          continue;
        } 
        else 
          {
            const [titulo, autor, anio, paginas, genero, disp] = linea.split(";");
            const libro = new Libro(titulo.trim(), autor.trim(), Number(anio), Number(paginas), genero.trim(), disp.trim().toLowerCase() === "si");
            if (this.agregar(libro)) 
              {
                añadidos++;
              }
          }
      }
    return añadidos;
  }
  /**
   * Calcula estadísticas del catálogo.
   * @returns {{total: number, disponibles: number, prestados: number,
   *   mediaPaginas: number, masAntiguo: Libro, porGenero: Map<string, number>}}
   *   Objeto con los datos estadísticos.
   */
  estadisticas()
  {
    const total = this.libros.length;
    const disponibles = this.filtrarPorDisponibilidad(true).length;
    const prestados = this.filtrarPorDisponibilidad(false).length;

    const sumaPaginas = this.libros.reduce((suma, l) => suma + l.paginas, 0); //suma, acumulador que empieza en 0 + paginas del libro (recorremos el array)
    let mediaPaginas;

    if (total === 0) 
    {
      mediaPaginas = 0;
    } 
    else
    {
      mediaPaginas = Math.round(sumaPaginas / total);
    }
    //En la primera vuelta l.anio pertenece a this.libros[0] y antiguo.anio a this.libros[0]. Si el año del l es menor que del antiguo, nos quedamos con l y sino con antiguo
    const masAntiguo = this.libros.reduce((antiguo, l) => l.anio < antiguo.anio ? l : antiguo, this.libros[0]); 

    const porGenero = new Map();

    for (const libro of this.libros) 
      {
        const genero = libro.genero;

        if (porGenero.has(genero)) {
          // Si el género ya está en el Map, le sumo 1
          const contador = porGenero.get(genero);
          porGenero.set(genero, contador + 1);
        } else {
          // Si el género es nuevo, empieza en 1
          porGenero.set(genero, 1);
        }
      }

    return { total, disponibles, prestados, mediaPaginas, masAntiguo, porGenero };
  }
}
export const catalogo = new Biblioteca();

catalogo.agregar(new Libro("El Quijote", "Miguel de Cervantes", 1605, 1250, "novela"));
catalogo.agregar(new Libro("La casa de Bernarda Alba", "Federico García Lorca", 1945, 120, "teatro", false));
catalogo.agregar(new Libro("Niebla", "Miguel de Unamuno", 1914, 280, "novela"));
catalogo.agregar(new Libro("Campos de Castilla", "Antonio Machado", 1912, 190, "poesía"));
catalogo.agregar(new Libro("Rimas y leyendas", "Gustavo Adolfo Bécquer", 1871, 210, "poesía", false));
catalogo.agregar(new Libro("La Regenta", "Leopoldo Alas Clarín", 1885, 800, "novela"));
catalogo.agregar(new Libro("Bodas de sangre", "Federico García Lorca", 1933, 110, "teatro"));
catalogo.agregar(new Libro("En torno al casticismo", "Miguel de Unamuno", 1895, 220, "ensayo"));

catalogo.cargarDesdeTexto(`Luces de bohemia;Ramón del Valle-Inclán;1924;160;teatro;si
La colmena;Camilo José Cela;1951;350;novela;no
Platero y yo;Juan Ramón Jiménez;1914;130;poesía;si
La rebelión de las masas;José Ortega y Gasset;1930;300;ensayo;si
Fortunata y Jacinta;Benito Pérez Galdós;1887;1000;novela;no`);
