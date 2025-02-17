package com.example.mvc_calificaciones.controlador;

import com.example.mvc_calificaciones.modelo.Alumno;
import com.example.mvc_calificaciones.servicio.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@Controller
@RequestMapping("/api/alumnos")
public class AlumnoController {
    private final AlumnoService alumnoService;

    @Autowired
    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }


    @GetMapping("/obtener/datos")
    public ResponseEntity<?> obtenerDatos(){ // Mejor usar ResponseEntity<?>
        try {
            List<Alumno> alumnos = alumnoService.obtenerTodos();
            return ResponseEntity.ok(alumnos); // Devuelve 200 OK con la lista
        } catch (Exception e) { // Captura cualquier excepción
            // 1. Loguea el error (¡MUY IMPORTANTE!)
            System.err.println("Error al obtener datos: " + e.getMessage()); // Para desarrollo
            e.printStackTrace(); // Para ver la traza completa en la consola

            // 2. Devuelve un error 500 con un mensaje (para el cliente)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener los datos. Contacte al administrador."); // Mensaje genérico
        }
    }

    @GetMapping("/obtener")
    public String visualizarAlumnos(Model model) {

        model.addAttribute("alumnos", alumnoService.obtenerTodos());
        return "alumnos";
    }

    @GetMapping
    public List<Alumno> obtenerTodos() {
        return alumnoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Alumno obtenerPorId(@PathVariable int id) {
        return alumnoService.obtenerPorId(id);
    }

    @GetMapping("/insertar")
    public String mostrarFormularioInsertar() {
        return "insertar_alumnos";
    }


    @PostMapping("/insertar")
    public String agregarAlumno(@RequestParam String nombre,
                              @RequestParam double nota) {
      Alumno objes =  new Alumno(1, nombre, nota);

        alumnoService.agregarAlumno(objes);
        return "redirect:/api/alumnos/obtener";
    }

    @PutMapping("/{id}")
    public void actualizarNota(@PathVariable int id, @RequestParam double nota) {
        alumnoService.actualizarNota(id, nota);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarAlumno(
            @PathVariable int id,
            @RequestBody Map<String, Object> datos) {  // Cambiar a @RequestBody

        try {
            String nombre = (String) datos.get("nombre");
            double nota = Double.parseDouble(datos.get("nota").toString());

            alumnoService.actualizarAlumno(id, nombre, nota);
            return ResponseEntity.ok("Alumno actualizado correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Map<String, String>> eliminarAlumno(@PathVariable int id) {
        Map<String, String> response = new  HashMap<>();
        try {
            alumnoService.eliminarAlumno(id);
            response.put("mensaje", "Alumno eliminado correctamente");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    // Endpoint para descargar el reporte CSV
    @GetMapping("/descargar-csv")
    public ResponseEntity<InputStreamResource> descargarCSV() throws IOException {
        // Obtener la lista de alumnos
        List<Alumno> alumnos = alumnoService.obtenerTodos();

        // Crear el archivo CSV
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(outputStream);

        // Escribir el encabezado del CSV
        writer.println("ID,Nombre,Nota");

        // Escribir los datos de los alumnos
        for (Alumno alumno : alumnos) {
            writer.println(alumno.getId() + "," + alumno.getNombre() + "," + alumno.getNota());
        }

        writer.flush();
        writer.close();

        // Convertir el CSV a un InputStream
        ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

        // Configurar las cabeceras de la respuesta
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=alumnos.csv");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(new InputStreamResource(inputStream));
    }

    @GetMapping("/estadisticas-notas")
    public ResponseEntity<?> obtenerEstadisticasNotas() {
        try {
            Map<String, Long> estadisticas = alumnoService.obtenerEstadisticasNotas();
            return ResponseEntity.ok(estadisticas);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
