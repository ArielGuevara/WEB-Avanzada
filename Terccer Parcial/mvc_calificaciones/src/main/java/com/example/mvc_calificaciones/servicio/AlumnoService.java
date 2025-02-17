package com.example.mvc_calificaciones.servicio;

import com.example.mvc_calificaciones.modelo.Alumno;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.IOException;
import java.io.File;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class AlumnoService {
    private final String FILE_PATH = "C:\\Users\\Ariel\\Documentos\\ESPE\\WEB Avanzada\\TERCER PARCIAL\\SpringBoot\\alumnos.json";
    private List<Alumno> alumnos;
    private final ObjectMapper objectMapper;
    //private int nextID = 1;


    public AlumnoService() {
        this.objectMapper = new ObjectMapper();
        this.alumnos = cargarDesdeArchivo();
    }

    // Cargar datos desde el archivo JSON
    private List<Alumno> cargarDesdeArchivo() {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(file, new TypeReference<List<Alumno>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    // Guardar datos en el archivo JSON
    private void guardarEnArchivo() {
        try {
            objectMapper.writeValue(new File(FILE_PATH), alumnos);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Alumno> obtenerTodos() {
        return alumnos;
    }

    public Alumno obtenerPorId(int id) {
        return alumnos.stream()
                .filter(alumno -> alumno.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public void agregarAlumno(Alumno alumno) {
        List<Alumno> temp = new ArrayList();
        temp = cargarDesdeArchivo();
        if (temp.isEmpty()){
            alumno.setId(1);
            alumnos.add(alumno);
            guardarEnArchivo();
            return;
        }

        alumno.setId(temp.size() + 1);
        alumnos.add(alumno);
        guardarEnArchivo();
    }

    public void actualizarNota(int id, double nota) {
        for (Alumno alumno : alumnos) {
            if (alumno.getId() == id) {
                alumno.setNota(nota);
                guardarEnArchivo();
                break;
            }
        }
    }
    public void actualizarAlumno(int id, String nombre, double nota) {
        Optional<Alumno> alumnoOptional = alumnos.stream().filter(a -> a.getId() == id).findFirst();

        if (alumnoOptional.isPresent()) {
            Alumno alumno = alumnoOptional.get();
            alumno.setNombre(nombre);
            alumno.setNota(nota);
        } else {
            throw new RuntimeException("Alumno no encontrado.");
        }
    }

    public void eliminarAlumno(int id) {
        boolean eliminado = alumnos.removeIf(alumno -> alumno.getId() == id);

        if (!eliminado) {
            throw new RuntimeException("El alumno con ID " + id + " no existe.");
        }

        guardarEnArchivo();
    }

    public Map<String, Long> obtenerEstadisticasNotas() {
        try {
            if (alumnos == null || alumnos.isEmpty()) {
                throw new RuntimeException("No hay alumnos registrados.");
            }

            Map<String, Long> estadisticas = new LinkedHashMap<>();
            estadisticas.put("0-2", 0L);
            estadisticas.put("2-4", 0L);
            estadisticas.put("4-6", 0L);
            estadisticas.put("6-8", 0L);
            estadisticas.put("8-10", 0L);

            for (Alumno alumno : alumnos) {
                double nota = alumno.getNota();
                if (nota >= 0 && nota < 2) {
                    estadisticas.put("0-2", estadisticas.get("0-2") + 1);
                } else if (nota >= 2 && nota < 4) {
                    estadisticas.put("2-4", estadisticas.get("2-4") + 1);
                } else if (nota >= 4 && nota < 6) {
                    estadisticas.put("4-6", estadisticas.get("4-6") + 1);
                } else if (nota >= 6 && nota < 8) {
                    estadisticas.put("6-8", estadisticas.get("6-8") + 1);
                } else if (nota >= 8 && nota <= 10) {
                    estadisticas.put("8-10", estadisticas.get("8-10") + 1);
                }
            }

            return estadisticas;
        } catch (Exception e) {
            throw new RuntimeException("Error al calcular las estadísticas de notas: " + e.getMessage());
        }
    }
}