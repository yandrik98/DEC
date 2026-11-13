**ejA1:**

| Expresión                    | Mi predicción       | Resultado real      | Tipo (typeof) | Explicación (una línea)                                                                                                 |
| ---------------------------- | ------------------- | ------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `"5" + 3`                    | 53                  | "53"                | String        | Concatenan porque uno de ellos es string                                                                                |
| `"5" * 3`                    | Nan                 | 15                  | Number        | Con \* el string 5 pasa a ser número, si tuviese letras daría Nan                                                       |
| `"5" - "2"`                  | 3                   | 3                   | Number        | Con - ambos strings pasan a ser números                                                                                 |
| `Number("")`                 | 0                   | 0                   | Number        | No hay nada dentro del string, por lo que pasa a ser 0                                                                  |
| `Number("12px")`             | Nan                 | Nan                 | Number        | Falla porque estamos usando Number y hay letras                                                                         |
| `parseInt("12px")`           | 12                  | 12                  | Number        | Coge los números unicamente y se olvida de las letras                                                                   |
| `parseFloat("3.75€")`        | 3.75                | 3.75                | Number        | Pasa lo mismo que parseInt pero también cuenta los decimales                                                            |
| `"10" == 10`                 | true                | true                | Boolean       | El == cambia el string a numero, y solo compara los valores                                                             |
| `"10" === 10`                | false               | false               | Boolean       | Compara tanto el número como el tipo                                                                                    |
| `null + 1`                   | null                | 1                   | Number        | Null pasa a ser 0                                                                                                       |
| `undefined + 1`              | NaN                 | NaN                 | Number        | El "+" hace que ambos lados pasen a ser Number y Number(Undefined) es igual a Nan y cualquier valor sumado a Nan es Nan |
| `typeof NaN`                 | Number              | "number"            | String        | Es de tipo Number                                                                                                       |
| `Boolean("0")`               | True                | True                | Boolean       | Como es un string con un caracter, es truthy                                                                            |
| `0 \|\| "valor por defecto"` | "valor por defecto" | "valor por defecto" | String        | Como 0 es falsy, nos quedamos con la otra opción que es truthy                                                          |
| `0 ?? "valor por defecto"`   | 0                   | 0                   | Number        | El valor a la derecha de "??" solo se establecerá cuando tengamos null o undefined                                      |

**¿Por qué `NaN === NaN` devuelve `false`?**
Porque un Nan nunca es igual a nada, incluso a otro Nan

**¿Cómo compruebo correctamente si un valor es `NaN`?**
Con Number.isNaN(valor), y devuelve true o false.

**ejA2:**

**1. ¿Qué muestra cada console.log? Ejecútalo después y compara.**
console.log("Dentro:", total); // Dentro:55
console.log("Fuera:", total); // Fuera:0
console.log(descuento); //Error, descuento no está definida (ReferenceError: descuento is not defined)
**2. ¿Por qué total vale distinto dentro y fuera de la función?**
Porque se declara de nuevo dentro de la función generando una variable distinta a la de fuera de la función
**3. ¿Qué error produce la última línea y por qué?**
Error, descuento no está definida. Esta definida dentro de la función, dentro del bloque if, y como const tiene ambito de bloque no se puede ver fuera
(ReferenceError: descuento is not defined)
**4. ¿Qué cambia si dentro de la función sustituyes let total = … por total = …?**
Coge el valor que hemos puesto fuera de la función y lo modifica
**5. ¿Qué ocurre si añades gastosEnvio = 7; al final del programa?**
Da error porque está declarado como const, y el valor no se puede sustituir

**ejA4:**

**1. Usa un Set para obtener los correos sin repetir. ¿Cuántos salen? ¿Por qué no es el resultado que esperabas?**
Sale 6. Porque Set tiene en cuenta mayúsculas y minúsculas, por ejemplo: ana@ies.es no es lo mismo que ANA@ies.es porque una se escribe con minúscula y la otra con mayúscula.
**2. Repite el apartado normalizando antes cada correo a minúsculas (correo.toLowerCase()). ¿Cuántos salen ahora?**
Ahora salen 4

**ejA5:**
**4. Reescribe el apartado 3 con map y filter. Explica en dos líneas qué tienen en común tus funciones y los métodos de los arrays.**
Lo que tienen en común mis funciones, map y filter es que reciben un array y una función callback,
además, no modifican el array original, sino que devuelven uno nuevo

**ejA6:**

| Línea | Error                                                                                                                                              | Cómo lo detectaste                                                                                                                                         | Corrección                                                 |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 6     | notas[0] es un string y al agregarlo a suma, este pasa a ser string tambien                                                                        | Desde Watch type of suma cambio de number a string y el valor de suma paso a ser string, además después de este todos los valores no sumarán, concatenaran | Pasar todos los valores a Number: suma +=Number(notas[i]); |
| 5     | El if usa >5 así que notas[2] que esta aprobado no entra                                                                                           | Porque cuando i vale 2, notas[i] vale 5 y el contador se quedo en 1                                                                                        | notas[i] >= 5                                              |
| 4     | El bucle usa la condición <=notas.length haciendo una vuelta más                                                                                   | Cuando i = 5, notas[i] también es 5 pero no hay ningún valor, devuelve undefined                                                                           | i<notas.length                                             |
| 10    | Además de que suma ya esta mal calculada, se divide entre la cantidad de valores de notas, cuando solo debería ser entre contador(notas aprobadas) | En el return notas.length vale 5 y contador 2. El resultado es 15.9 y debe der ser 17.7                                                                    | return suma/contador;                                      |

**Investigación previa: carga de scripts**

**1. Consulta en MDN la página del element <script> y explica con tus palabras qué hacen los atributos defer y async. Indica en qué se diferencian.**
async: ejecuta el script en cuanto se descarga, sin esperar a que la página esté lista. No respeta el orden entre scripts.

defer: espera a que todo el HTML esté leído para ejecutarlo, y si hay varios, los ejecuta en el orden en que están escritos.

La diferencia es cuándo se ejecutan y que defer mantiene el orden y async no.

**2. Haz la prueba: quita defer de los dos <script> de index.html, recarga la página y copia el error que aparece en la consola. ¿Por qué se produce?**

Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')
at mostrar (app.js:11:46)
at app.js:196:1

Sin defer, app.js se ejecuta antes de que el navegador ejecute el html.

**3.Vuelve a poner defer y cambia el orden de los scripts, de modo que app.js se cargue antes que datos.js. ¿Qué error aparece ahora y por qué**

Uncaught ReferenceError: LIBROS is not defined
at app.js:196:34
Porque con defer los script se ejecutan en el orden en el que están escritos, por lo que se ejecuta app.js y después datos.js y usa LIBROS que todavía no existiría.

**4. ¿Por qué defer es más adecuado que async en este proyecto?**
Porque respeta el orden de los scripts y espera a que el html esta cargado.
