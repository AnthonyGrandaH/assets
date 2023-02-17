create database proyecto_assets

CREATE TABLE IF NOT EXISTS departamento
(
    iddepartamento integer NOT NULL DEFAULT nextval('"Departamento_idDepartamento_seq"'::regclass),
    nombre_departamento character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT "Departamento_pk" PRIMARY KEY (iddepartamento),
    CONSTRAINT departamento_nombre_departamento_key UNIQUE (nombre_departamento)
)

