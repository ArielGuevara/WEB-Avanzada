
function ordenarAcsendente() {
    let tabla = document.getElementById("tabla-alumnos");

    if (!tabla) {
        console.error("No se encontró la tabla de alumnos.");
        return;
    }

    let filas = Array.from(tabla.querySelectorAll("tr"));

    if (filas.length === 0) {
        console.error("No hay filas en la tabla.");
        return;
    }

    filas.sort((a, b) => {
        let notaA = parseFloat(a.cells[1].textContent.trim());
        let notaB = parseFloat(b.cells[1].textContent.trim());

        if (isNaN(notaA) || isNaN(notaB)) {
            console.error("Error al convertir las notas.");
            return 0;
        }

        return notaA - notaB; // Orden ascendente
    });

    filas.forEach(fila => tabla.appendChild(fila));

    console.log("Tabla ordenada correctamente. asc");
}

function ordenarDecsendente() {
    let tabla = document.getElementById("tabla-alumnos");

    if (!tabla) {
        console.error("No se encontró la tabla de alumnos.");
        return;
    }

    let filas = Array.from(tabla.querySelectorAll("tr"));

    if (filas.length === 0) {
        console.error("No hay filas en la tabla.");
        return;
    }

    filas.sort((a, b) => {
        let notaA = parseFloat(a.cells[1].textContent.trim());
        let notaB = parseFloat(b.cells[1].textContent.trim());

        if (isNaN(notaA) || isNaN(notaB)) {
            console.error("Error al convertir las notas.");
            return 0;
        }

        return notaB - notaA; // Orden ascendente
    });

    filas.forEach(fila => tabla.appendChild(fila));

    console.log("Tabla ordenada correctamente.dsc");
}

function ordenarAlfAscendente(){
 let tabla = document.getElementById("tabla-alumnos");

        if (!tabla) {
            console.error("No se encontró la tabla de alumnos.");
            return;
        }

        let filas = Array.from(tabla.querySelectorAll("tr"));

        if (filas.length === 0) {
            console.error("No hay filas en la tabla.");
            return;
        }

        filas.sort((a, b) => {
            let nombreA = a.cells[0].textContent.trim().toLowerCase();
            let nombreB = b.cells[0].textContent.trim().toLowerCase();
            return nombreA.localeCompare(nombreB); // Orden alfabético
        });

        filas.forEach(fila => tabla.appendChild(fila));

        console.log("Tabla ordenada por nombre ascendente.");
}

function ordenarAlfDescendente(){
 let tabla = document.getElementById("tabla-alumnos");

        if (!tabla) {
            console.error("No se encontró la tabla de alumnos.");
            return;
        }

        let filas = Array.from(tabla.querySelectorAll("tr"));

        if (filas.length === 0) {
            console.error("No hay filas en la tabla.");
            return;
        }

        filas.sort((a, b) => {
            let nombreA = a.cells[0].textContent.trim().toLowerCase();
            let nombreB = b.cells[0].textContent.trim().toLowerCase();
            return nombreB.localeCompare(nombreA); // Orden alfabético descendente
        });

        filas.forEach(fila => tabla.appendChild(fila));

        console.log("Tabla ordenada por nombre.");
}

function actualizarTabla(data) {
    let tbody = document.getElementById("tabla-alumnos");

    if (!tbody) {
        console.error("No se encontró el cuerpo de la tabla.");
        return;
    }

    // Limpiar la tabla
    tbody.innerHTML = "";

    // Verificar si data es un array y no está vacío
    if (!Array.isArray(data)) {
        console.error("Los datos recibidos no son un array válido.");
        return;
    }

    if (data.length === 0) {
        console.warn("No hay datos para mostrar.");
        return;
    }

    // Reconstruir la tabla con los datos actualizados
    data.forEach(alumno => {
        let fila = `
            <tr id="fila-${alumno.id}">
                <td>${alumno.nombre}</td>
                <td>${alumno.nota}</td>
                <td>
                    <button class="btn btn-warning" onclick="editarAlumno(${alumno.id})">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <button class="btn btn-danger" onclick="eliminarAlumno(${alumno.id})">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

function eliminarAlumno(id) {
    let fila = document.getElementById(`fila-${id}`);

    if (!fila) {
        console.error(`No se encontró la fila del alumno con ID ${id}.`);
        return;
    }

    // Enviar la solicitud DELETE para eliminar el alumno
    fetch(`/api/alumnos/eliminar/${id}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error || "Error al eliminar"); });
            }
            return response.json(); // Cambiar a response.json() si el servidor devuelve JSON
        })
        .then(data => {
            console.log("Respuesta del servidor:", data);

            // Obtener la lista actualizada de alumnos
            fetch("/api/alumnos/obtener/datos")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos actualizados.");
                    }
                    return response.json();
                })
                .then(data => {

                    // Llamar a actualizarTabla con los datos actualizados
                    actualizarTabla(data);
                    console.log("Alumno eliminado con éxito.");
                    cargarGraficoNotas();
                })
                .catch(error => {
                    console.error("Error al obtener los datos actualizados:", error);
                    alert("Hubo un error al obtener los datos actualizados.");
                });
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`Hubo un error al eliminar el alumno: ${error.message}`);
        });
}

let alumnoEditando = null; // Guardará el ID del alumno a editar

function editarAlumno(id) {
    alumnoEditando = id; // Guardamos el ID del alumno

    let fila = document.getElementById(`fila-${id}`);
    let nombre = fila.cells[0].textContent;
    let nota = fila.cells[1].textContent;

    // Rellenar el formulario del modal con los valores actuales
    document.getElementById("nombre-editar").value = nombre;
    document.getElementById("nota-editar").value = nota;

    // Mostrar el modal
    document.getElementById("modal-editar").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modal-editar").style.display = "none";
}

function guardarCambios() {
    let nombre = document.getElementById("nombre-editar").value;
    let nota = document.getElementById("nota-editar").value;

    // Validar que la nota esté en el rango correcto
    if (nota < 0 || nota > 10) {
        alert("La nota debe estar en un rango de 0 a 10.");
        return;
    }

    // Enviar la solicitud PUT para editar el alumno
    fetch(`/api/alumnos/editar/${alumnoEditando}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, nota })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.text(); // Cambiar a response.json() si el servidor devuelve JSON
    })
    .then(data => {
        // Cerrar el modal después de editar
        cerrarModal();

        // Obtener la lista actualizada de alumnos
        fetch("/api/alumnos/obtener/datos")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos actualizados.");
                }
                return response.json();
            })
            .then(data => {
                // Llamar a actualizarTabla con los datos actualizados
                actualizarTabla(data);
                cargarGraficoNotas();
                console.log("Alumno actualizado con éxito.");
            })
            .catch(error => {
                console.error("Error al obtener los datos actualizados:", error);
                alert("Hubo un error al obtener los datos actualizados.");
            });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un error al actualizar el alumno.");
    });
}

// Lista de alumnos (puedes obtenerla desde una API o definirla manualmente)
let alumnos = [];

// Función para buscar alumnos por nombre
function buscarAlumnos() {
    // Obtener el valor del campo de búsqueda
    const textoBusqueda = document.getElementById("buscador").value.toLowerCase();

    // Filtrar la lista de alumnos
    const alumnosFiltrados = alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(textoBusqueda)
    );

    // Actualizar la tabla con los resultados filtrados
    actualizarTabla(alumnosFiltrados);
}

// Función para actualizar la tabla con datos
function actualizarTabla(data) {
    let tbody = document.getElementById("tabla-alumnos");
    tbody.innerHTML = ""; // Limpiar la tabla

    // Reconstruir la tabla con los datos actualizados
    data.forEach(alumno => {
        let fila = `
            <tr id="fila-${alumno.id}">
                <td>${alumno.nombre}</td>
                <td>${alumno.nota}</td>
                <td>
                    <button class="btn btn-warning" onclick="editarAlumno(${alumno.id})">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <button class="btn btn-danger" onclick="eliminarAlumno(${alumno.id})">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

// Cargar la lista de alumnos inicialmente (puedes obtenerla desde una API)
function cargarAlumnos() {
    fetch("/api/alumnos/obtener/datos")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de los alumnos.");
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("La respuesta del servidor no es un array válido.");
            }
            alumnos = data; // Guardar los datos en la lista de alumnos
            actualizarTabla(alumnos); // Mostrar todos los alumnos al inicio
        })
        .catch(error => {
            console.error("Error al cargar los alumnos:", error);
            alert("Hubo un error al cargar los alumnos. Por favor, inténtalo de nuevo.");
        });
}

// Función para obtener los datos y crear el gráfico
async function cargarGraficoNotas() {
    try {
        // Obtener los datos del backend
        const response = await fetch("/api/alumnos/estadisticas-notas");
        const data = await response.json();

        // Preparar los datos para Chart.js
        const labels = Object.keys(data); // Rangos de notas
        const valores = Object.values(data); // Cantidad de alumnos

        // Crear el gráfico
        const ctx = document.getElementById("graficoNotas").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Cantidad de alumnos",
                    data: valores,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Cantidad de alumnos"
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Rangos de notas"
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Distribución de notas de los alumnos"
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error al cargar el gráfico:", error);
    }
}

// Llamar a la función para cargar el gráfico al inicio
cargarGraficoNotas();


// Llamar a la función para cargar los alumnos al inicio
cargarAlumnos();