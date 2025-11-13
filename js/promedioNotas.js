const containerEstudiantes = document.querySelector("#idContainerEstudiantes");
const btnPromedio = document.querySelector("#idBtnPromedio");

// Evento para generar el registro de calificaciones
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
  // Utilizaremos un arreglo para guardar la información del estudiante
  let arrayEstudiante = new Array();

  let totalEstudiantes = document.querySelector("#inputNumeroEstudiantes").value;
  let contador = 1;

  // Utilizaremos un while para recorrer el total de estudiantes
  let estudiante,
      calificacion,
      convertir = 0;

  while (contador <= totalEstudiantes) {
    estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);
    // Verificamos que sea un valor entero positivo y en el rango 0 - 10
    do {
      calificacion = prompt(`Ingrese la calificación del estudiante ${contador}`);
      convertir = parseFloat(calificacion);
    } while (isNaN(convertir) || convertir < 0 || convertir > 10);

    // Asignando los valores al arreglo
    arrayEstudiante[contador - 1] = new Array(
      estudiante,
      parseFloat(calificacion).toFixed(2)
    );
    contador++;
  }

  // Recorriendo el arreglo con for..of
  // Verificaremos cuál es el promedio y el estudiante con la nota más alta
  let calificacionAlta = 0,
      promedio = 0,
      posicion = 0;

  let listado = "<h3>Listado de estudiantes registrados</h3>";
  listado += "<ol>";

  for (let indice of arrayEstudiante) {
    let nombre = indice[0];
    let nota = indice[1];

    // Imprimiendo la lista de estudiantes
    listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;

    // Verificación de calificación más alta
    if (nota > calificacionAlta) {
      calificacionAlta = nota;
      posicion = indice;
    }

    // Calculando el promedio
    promedio += parseFloat(nota);
  }

  promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
  listado += `</ol><b>Promedio de calificaciones:</b> ${promedio}`;
  listado += `<br><b>Estudiante con mejor calificación:</b> ${posicion[0]}</p>`;

  // Imprimiendo resultado
  containerEstudiantes.innerHTML = listado;
}
