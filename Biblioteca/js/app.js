import { catalogo } from "./biblioteca.js"; //Importamos el catálogo de biblioteca

const TEXTO_BUSQUEDA = "de";
const contenedor = document.getElementById("contenedor");

/**
 * Crea una etiqueta con texto.
 * @param {string} etiqueta Nombre de la etiqueta (p, h2, h3...).
 * @param {string} texto Texto que lleva dentro.
 * @returns {HTMLElement} El elemento creado.
 */
function crear(etiqueta, texto) {
  const elemento = document.createElement(etiqueta);
  elemento.textContent = texto;
  return elemento;
}

/**
 * Crea la tarjeta (article) de un libro.
 * @param {import("./libro.js").Libro} libro Libro a mostrar.
 * @returns {HTMLElement} La tarjeta.
 */
function crearTarjeta(libro) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const titulo = crear("h3", libro.titulo);

  const autor = crear("p", libro.autor);
  autor.classList.add("autor");

  const datos = crear("p", `${libro.anio} · ${libro.paginas} págs. · ${libro.genero}`);
  datos.classList.add("datos");

  const etiqueta = document.createElement("span");
  etiqueta.classList.add("etiqueta");

  if (libro.disponible) {
    tarjeta.classList.add("disponible");
    etiqueta.textContent = "Disponible";
  } else {
    tarjeta.classList.add("prestado");
    etiqueta.textContent = "Prestado";
  }

  tarjeta.append(titulo);
  tarjeta.append(autor);
  tarjeta.append(datos);
  tarjeta.append(etiqueta);
  return tarjeta;
}

/**
 * Pinta una sección con su encabezado y una tarjeta por libro.
 * @param {string} titulo Encabezado de la sección.
 * @param {import("./libro.js").Libro[]} lista Libros a mostrar.
 * @returns {void}
 */
function pintarSeccion(titulo, lista) {
  const seccion = document.createElement("section");
  const numero = contenedor.children.length + 1;
  seccion.id = "seccion-" + numero;
  seccion.append(crear("h2", titulo));

  if (lista.length === 0) {
    seccion.append(crear("p", "No hay libros en esta sección"));
  } else {
    const rejilla = document.createElement("div");
    rejilla.classList.add("rejilla");
    for (const libro of lista) {
      rejilla.append(crearTarjeta(libro));
    }
    seccion.append(rejilla);
  }
  contenedor.append(seccion);
}

/**
 * Presta o devuelve un libro y muestra el resultado en la consola.
 * @param {string} titulo Título del libro.
 * @param {"prestar"|"devolver"} accion Operación a realizar.
 * @returns {void}
 */
function operar(titulo, accion) {
  const libro = catalogo.buscar(titulo)[0];

  if (libro === undefined) {
    // Si no existe el libro, avisamos y no hacemos nada más
    console.log(`No existe el libro "${titulo}"`);
  } else {
    let resultado;
    if (accion === "prestar") {
      resultado = libro.prestar();
    } else {
      resultado = libro.devolver();
    }
    console.log(`${accion} ${libro.titulo}: ${resultado}`);
  }
}

/**
 * Genera el índice con un enlace a cada sección ya pintada.
 * @returns {void}
 */
function pintarIndice() {
  const indice = document.getElementById("indice");
  for (const seccion of contenedor.querySelectorAll("section")) {
    const enlace = crear("a", seccion.querySelector("h2").textContent);
    enlace.href = "#" + seccion.id;
    indice.append(enlace);
  }
}

/**
 * Pinta el panel con las estadísticas.
 * @returns {void}
 */
function pintarEstadisticas() {
  const e = catalogo.estadisticas();
  const panel = document.getElementById("estadisticas");

  panel.append(crear("h2", "Estadísticas"));
  panel.append(crear("p", `Total: ${e.total}`));
  panel.append(crear("p", `Disponibles: ${e.disponibles}`));
  panel.append(crear("p", `Prestados: ${e.prestados}`));
  panel.append(crear("p", `Media de páginas: ${e.mediaPaginas}`));
  panel.append(crear("p", `Más antiguo: ${e.masAntiguo.resumen()}`));
  for (const [genero, cantidad] of e.porGenero) {
    panel.append(crear("p", `${genero}: ${cantidad}`));
  }
}

// ---------- Programa ----------
console.table(catalogo.libros);

// RF6: simulación de préstamos
operar("Niebla", "prestar");
operar("La Regenta", "prestar");
operar("Bodas de sangre", "prestar");
operar("Rimas y leyendas", "devolver");
operar("Niebla", "prestar"); // ya estaba prestado: false

// RF5: vistas
pintarSeccion("Catálogo completo", catalogo.ordenarPor("titulo"));
pintarSeccion("Libros disponibles", catalogo.filtrarPorDisponibilidad(true));
pintarSeccion("Libros prestados", catalogo.filtrarPorDisponibilidad(false));

for (const genero of catalogo.generos()) {
  pintarSeccion("Género: " + genero, catalogo.filtrarPorGenero(genero));
}

pintarSeccion(
  "Los 5 libros más antiguos",
  catalogo.ordenarPor("anio").slice(0, 5),
);

const novelas = catalogo.filtrarPorGenero("novela");
const novelasDisponibles = novelas.filter((l) => l.disponible);
const novelasOrdenadas = [...novelasDisponibles].sort(
  (a, b) => a.paginas - b.paginas,
);
pintarSeccion("Novelas disponibles por páginas", novelasOrdenadas);

pintarSeccion(`Búsqueda: "${TEXTO_BUSQUEDA}"`, catalogo.buscar(TEXTO_BUSQUEDA));

// RF7
pintarEstadisticas();
pintarIndice();