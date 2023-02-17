CREATE DATABASE clientedb

CREATE TABLE cliente(
    id serial
    ced_cliente int PRIMARY KEY,
    nombre_cliente varchar(255),
    telefono_cliente int,
    direccion_cliente varchar(255),
    email-cliente varchar(255)
);