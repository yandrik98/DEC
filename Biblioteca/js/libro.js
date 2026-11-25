/**
 * Representa un libro de la biblioteca
 */
export class Libro {
  /**
   * Crea un libro
   * @param {string} titulo
   * @param {string} autor
   * @param {number} anio
   * @param {number} paginas
   * @param {string} genero
   * @param {boolean} [disponible=true]
   */
  constructor(titulo, autor, anio, paginas, genero, disponible = true) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
    this.paginas = paginas;
    this.genero = genero;
    this.disponible = disponible; //parámetro opcional. Los parámetros opcionales van siempre al final
  }
  /**
   * Marca el libro como prestado
   * @returns {boolean} false si no estaba disponible y si estaba disponible pasa a no estarlo y devuelve true
   */
  prestar() {
    if (!this.disponible) {
      return false;
    } else {
      this.disponible = false;
      return true;
    }
  }
  /**
   * Marca el libro como devuelto
   * @returns {boolean} false en caso de estar disponible, y si no estaba disponible pasa a estarlo y devuelve true
   */
  devolver() {
    if (this.disponible) {
      return false;
    } else {
      this.disponible = true;
      return true;
    }
  }
  /**
   * Calcula los años desde la publicación usando el año actual de Date.
   * @returns {number} Devuelve Años transcurridos
   */
  antiguedad() {
    const hoy = new Date();
    return hoy.getFullYear() - this.anio;
  }
  /**
   * Texto con titulo, autor y año
   * @returns {string} Devuelvo una cadena con el título, autor y año
   */
  resumen() {
    return `${this.titulo} — ${this.autor} (${this.anio})`;
  }
}
