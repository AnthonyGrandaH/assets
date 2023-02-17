create database proyecto_assets

CREATE TABLE IF NOT EXISTS departamento
(
    iddepartamento integer NOT NULL DEFAULT nextval('"Departamento_idDepartamento_seq"'::regclass),
    nombre_departamento character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT "Departamento_pk" PRIMARY KEY (iddepartamento),
    CONSTRAINT departamento_nombre_departamento_key UNIQUE (nombre_departamento)
)


CREATE TABLE IF NOT EXISTS inventario
(
    idinventario integer NOT NULL DEFAULT nextval('"Inventario_idInventario_seq"'::regclass),
    descripcion character varying(255) COLLATE pg_catalog."default" NOT NULL,
    cantidad integer NOT NULL,
    fk_iddepartamento integer,
    fecha_registro date,
    observaciones character varying(500) COLLATE pg_catalog."default",
    CONSTRAINT "Inventario_pk" PRIMARY KEY (idinventario),
    CONSTRAINT "fk_idDepartamento" FOREIGN KEY (fk_iddepartamento)
        REFERENCES public.departamento (iddepartamento) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)