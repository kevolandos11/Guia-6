//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregarP");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiarP");
const buttonMostrarPaciente = document.getElementById("idBtnMostrarP");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];
// Índice para edición (-1 significa sin edición en curso)
let editIndex = -1;
// Guardar HTML original del botón Agregar para restaurarlo
const originalButtonAgregarHTML = buttonAgregarPaciente ? buttonAgregarPaciente.innerHTML : "Guardar Datos";

/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/
const limpiarForm = () => {
  inputNombre.value = "";
  inputApellido.value = "";
  inputFechaNacimiento.value = "";
  inputRdMasculino.checked = false;
  inputRdFemenino.checked = false;
  cmbPais.value = 0;
  inputDireccion.value = "";
  inputNombrePais.value = "";

  inputNombre.focus();
};

/*
Funcion para validar el ingreso del paciente
*/
const addPaciente = function () {
  let nombre = inputNombre.value;
  let apellido = inputApellido.value;
  let fechaNacimiento = inputFechaNacimiento.value;
  let sexo =
    inputRdMasculino.checked == true
      ? "Hombre"
      : inputRdFemenino.checked == true
      ? "Mujer"
      : "";
  let pais = cmbPais.value;
  let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  let direccion = inputDireccion.value;

  if (
    nombre != "" &&
    apellido != "" &&
    fechaNacimiento != "" &&
    sexo != "" &&
    pais != 0 &&
    direccion != ""
  ) {
    if (editIndex === -1) {
      // Agregar nuevo paciente
      arrayPaciente.push(
        new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
      );
      mensaje.innerHTML = "Se ha registrado un nuevo paciente";
    } else {
      // Actualizar paciente existente
      arrayPaciente[editIndex] = [
        nombre,
        apellido,
        fechaNacimiento,
        sexo,
        labelPais,
        direccion,
      ];
      mensaje.innerHTML = "Se ha actualizado el paciente";
      // Restaurar estado de edición
      editIndex = -1;
      if (buttonAgregarPaciente) buttonAgregarPaciente.innerHTML = originalButtonAgregarHTML;
    }

    // Mostrar notificación
    toast.show();

    // Limpiar formulario y refrescar tabla
    limpiarForm();
    imprimirPacientes();
  } else {
    //Asignando un mensaje a nuestra notificacion
    mensaje.innerHTML = "Faltan campos por completar";
    //Llamando al componente de Bootstrap
    toast.show();
  }
};

// Función que imprime la ficha de los pacientes registrados
function imprimirFilas() {
  let $fila = "";
  let contador = 1;

  arrayPaciente.forEach((element) => {
    $fila += `
      <tr>
        <td scope="row" class="text-center fw-bold">${contador}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td>${element[3]}</td>
        <td>${element[4]}</td>
        <td>${element[5]}</td>
        <td class="text-center">
          <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" alt="Editar">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" alt="Eliminar">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </td>
      </tr>`;
    contador++;
  });
  return $fila;
}

const imprimirPacientes = () => {
  let $table = `
  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <tr>
        <th scope="col" class="text-center" style="width:5%">#</th>
        <th scope="col" class="text-center" style="width:15%">Nombre</th>
        <th scope="col" class="text-center" style="width:15%">Apellido</th>
        <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
        <th scope="col" class="text-center" style="width:10%">Sexo</th>
        <th scope="col" class="text-center" style="width:10%">País</th>
        <th scope="col" class="text-center" style="width:25%">Dirección</th>
        <th scope="col" class="text-center" style="width:10%">Opciones</th>
      </tr>
      ${imprimirFilas()}
    </table>
  </div>`;

  document.getElementById("idTablaPacientes").innerHTML = $table;
  // Adjuntar eventos a los botones de las filas tras renderizar
  attachRowButtons();
};

// Adjunta eventos a los botones generados en cada fila (Editar/Eliminar)
const attachRowButtons = () => {
  for (let i = 0; i < arrayPaciente.length; i++) {
    const idx = i; // cerrar sobre valor
    const btnEdit = document.getElementById(`idBtnEditar${i + 1}`);
    const btnDelete = document.getElementById(`idBtnEliminar${i + 1}`);

    if (btnEdit) {
      btnEdit.onclick = () => {
        editarPaciente(idx);
      };
    }

    if (btnDelete) {
      btnDelete.onclick = () => {
        eliminarPaciente(idx);
      };
    }
  }
};

// Función para iniciar edición de un paciente
const editarPaciente = (index) => {
  const p = arrayPaciente[index];
  if (!p) return;
  // Rellenar formulario con los datos
  inputNombre.value = p[0];
  inputApellido.value = p[1];
  inputFechaNacimiento.value = p[2];
  if (p[3] === "Hombre") {
    inputRdMasculino.checked = true;
    inputRdFemenino.checked = false;
  } else if (p[3] === "Mujer") {
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = true;
  }
  // Seleccionar país por texto (por si los valores cambian)
  for (let i = 0; i < cmbPais.options.length; i++) {
    if (cmbPais.options[i].text === p[4]) {
      cmbPais.selectedIndex = i;
      break;
    }
  }
  inputDireccion.value = p[5];

  // Marcar índice de edición y cambiar el texto del botón guardar
  editIndex = index;
  if (buttonAgregarPaciente) buttonAgregarPaciente.innerHTML = '<i class="bi bi-save"></i> Actualizar';
  // Enfocar el primer campo
  inputNombre.focus();
};

// Función para eliminar un paciente
const eliminarPaciente = (index) => {
  if (!confirm("¿Está seguro que desea eliminar este paciente?")) return;
  arrayPaciente.splice(index, 1);
  mensaje.innerHTML = "Paciente eliminado";
  toast.show();
  // Refrescar tabla
  imprimirPacientes();
};

// Asegurar que los botones de fila estén enlazados después de renderizar
// Modificamos imprimirPacientes para llamar attachRowButtons

// Contador global de los option correspondientes al select de país
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
  let paisNew = inputNombrePais.value;

  if (paisNew != "") {
    // Creando nuevo option con la API DOM
    let option = document.createElement("option");
    option.textContent = paisNew;
    option.value = contadorGlobalOption + 1;

    // Agregando el nuevo option al select
    cmbPais.appendChild(option);

    // Mensaje de éxito
    mensaje.innerHTML = "País agregado correctamente";
    toast.show();
  } else {
    // Mensaje de error
    mensaje.innerHTML = "Faltan campos por completar";
    toast.show();
  }
};

// === Agregando eventos a los botones ===
buttonLimpiarPaciente.onclick = () => {
  limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
  addPaciente();
};

buttonMostrarPaciente.onclick = () => {
  imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
  addPais();
};

// === Foco automático en el campo del modal ===
idModal.addEventListener("shown.bs.modal", () => {
  inputNombrePais.value = "";
  inputNombrePais.focus();
});

// === Ejecutar función al cargar la página ===
limpiarForm();
