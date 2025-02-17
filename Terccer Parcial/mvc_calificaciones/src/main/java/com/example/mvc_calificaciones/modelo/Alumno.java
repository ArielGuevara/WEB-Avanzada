package com.example.mvc_calificaciones.modelo;

public class Alumno {
    //atributos
    private int id;
    private String nombre;
    private double nota;
    private String calificacion;


    public Alumno() {

    }

    public Alumno(String nombre, double nota) {
        this.nombre = nombre;
        this.nota = nota;
    }

    public Alumno(int id, String nombre, double nota) {
        this.id = id;
        this.nombre = nombre;
        this.nota = nota;
        this.calificacion = calcularCalificacion(nota);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getNota() {
        return nota;
    }

    public void setNota(double nota) {
        this.nota = nota;
        this.calificacion = calcularCalificacion(nota);
    }

    public String getCalificacion() {
        return calificacion;
    }

    private String calcularCalificacion(double nota) {
        if (nota >= 0 && nota <= 4.99) {
            return "Suspenso";
        } else if (nota >= 5 && nota <= 6.99) {
            return "Bien";
        } else if (nota >= 7 && nota <= 8.99) {
            return "Notable";
        } else if (nota >= 9 && nota <= 10) {
            return "Sobresaliente";
        } else {
            return "Nota inválida";
        }
    }
}
