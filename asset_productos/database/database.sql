create database proyecto_assets

CREATE TABLE IF NOT EXISTS public.productos
(
    pro_id integer NOT NULL DEFAULT nextval('productos_pro_id_seq'::regclass),
    pro_codigo character varying(13) COLLATE pg_catalog."default" NOT NULL,
    pro_nombre character varying COLLATE pg_catalog."default" NOT NULL,
    pro_precio double precision NOT NULL,
    pro_descripcion character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT productos_pkey1 PRIMARY KEY (pro_id)
)