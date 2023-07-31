--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Homebrew)
-- Dumped by pg_dump version 14.8 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


--
-- Name: product_import_history; Type: TABLE; Schema: public; Owner: aristide
--

CREATE TABLE public.product_import_history (
    id integer NOT NULL,
    date_import timestamp without time zone,
    file_name character varying,
    file_size character varying,
    file_url character varying
);


ALTER TABLE public.product_import_history OWNER TO aristide;

--
-- Name: product_import_history_id_seq; Type: SEQUENCE; Schema: public; Owner: aristide
--

CREATE SEQUENCE public.product_import_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_import_history_id_seq OWNER TO aristide;

--
-- Name: product_import_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aristide
--

ALTER SEQUENCE public.product_import_history_id_seq OWNED BY public.product_import_history.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: aristide
--

CREATE TABLE public.products (
    index bigint,
    "AR_Ref" text,
    "FA_CodeFamille" text,
    "AR_Design" text,
    "Colonne1" text,
    "AR_PrixVen" bigint,
    "StockTOTAL" bigint
);


ALTER TABLE public.products OWNER TO aristide;

--
-- Name: update_list; Type: TABLE; Schema: public; Owner: aristide
--

CREATE TABLE public.update_list (
    index bigint,
    nom_produit text,
    ancien_prix bigint,
    nouveau_prix bigint
);


ALTER TABLE public.update_list OWNER TO aristide;

--
-- Name: product_import_history id; Type: DEFAULT; Schema: public; Owner: aristide
--

ALTER TABLE ONLY public.product_import_history ALTER COLUMN id SET DEFAULT nextval('public.product_import_history_id_seq'::regclass);


--
-- Name: product_import_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aristide
--

SELECT pg_catalog.setval('public.product_import_history_id_seq', 105, true);


--
-- Name: product_import_history product_import_history_pkey; Type: CONSTRAINT; Schema: public; Owner: aristide
--

ALTER TABLE ONLY public.product_import_history
    ADD CONSTRAINT product_import_history_pkey PRIMARY KEY (id);


--
-- Name: ix_products_index; Type: INDEX; Schema: public; Owner: aristide
--

CREATE INDEX ix_products_index ON public.products USING btree (index);


--
-- Name: ix_update_list_index; Type: INDEX; Schema: public; Owner: aristide
--

CREATE INDEX ix_update_list_index ON public.update_list USING btree (index);


--
-- PostgreSQL database dump complete
--

