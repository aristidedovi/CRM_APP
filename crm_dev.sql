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
-- Name: categories; Type: TABLE; Schema: public; Owner: aristide
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    type character varying
);


ALTER TABLE public.categories OWNER TO aristide;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: aristide
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO aristide;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aristide
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


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
    index text,
    "uploaded-file" text
);


ALTER TABLE public.products OWNER TO aristide;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: aristide
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    question character varying,
    answer character varying,
    category character varying,
    difficulty integer
);


ALTER TABLE public.questions OWNER TO aristide;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: aristide
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO aristide;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aristide
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: aristide
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: product_import_history id; Type: DEFAULT; Schema: public; Owner: aristide
--

ALTER TABLE ONLY public.product_import_history ALTER COLUMN id SET DEFAULT nextval('public.product_import_history_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: aristide
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: aristide
--

COPY public.categories (id, type) FROM stdin;
\.


--
-- Data for Name: product_import_history; Type: TABLE DATA; Schema: public; Owner: aristide
--

COPY public.product_import_history (id, date_import, file_name, file_size, file_url) FROM stdin;
63	2023-07-06 13:39:20.965613	2023-07-06T13:39:18.764888list-new - 08_06_2023.csv	618780	./scv_file/2023-07-06T13:39:18.764888list-new - 08_06_2023.csv
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: aristide
--

COPY public.products (index, "uploaded-file") FROM stdin;
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: aristide
--

COPY public.questions (id, question, answer, category, difficulty) FROM stdin;
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aristide
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: product_import_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aristide
--

SELECT pg_catalog.setval('public.product_import_history_id_seq', 63, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aristide
--

SELECT pg_catalog.setval('public.questions_id_seq', 1, false);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: aristide
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: product_import_history product_import_history_pkey; Type: CONSTRAINT; Schema: public; Owner: aristide
--

ALTER TABLE ONLY public.product_import_history
    ADD CONSTRAINT product_import_history_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: aristide
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: ix_products_index; Type: INDEX; Schema: public; Owner: aristide
--

CREATE INDEX ix_products_index ON public.products USING btree (index);


--
-- PostgreSQL database dump complete
--

