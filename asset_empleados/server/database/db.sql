CREATE DATABASE IF NOT EXISTS empleados_assets;

CREATE TABLE empleados(
    id SERIAL PRIMARY KEY,
    cedula varchar(10) unique NOT NULL,
    nombres varchar(255) NOT NULL,
    apellidos varchar(255) NOT NULL,
    direccion varchar(255) NOT NULL,
    correo varchar(255) NOT NULL,
    cargo varchar(255) NOT NULL,
)

CREATE TABLE cargo(
    id SERIAL PRIMARY KEY,
    tipoCargo VARCHAR(255),
    descripcionCargo VARCHAR(255)
);