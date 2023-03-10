PGDMP         ,                {            PiyachokWeb    14.6    14.6 ,    (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    16420    PiyachokWeb    DATABASE     k   CREATE DATABASE "PiyachokWeb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Ukraine.1251';
    DROP DATABASE "PiyachokWeb";
                postgres    false            ?            1259    16421 #   establishments_establishment_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.establishments_establishment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.establishments_establishment_id_seq;
       public          postgres    false            ?            1259    16422    establishments    TABLE     ?  CREATE TABLE public.establishments (
    establishment_id integer DEFAULT nextval('public.establishments_establishment_id_seq'::regclass) NOT NULL,
    title character varying(45),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    type character varying(45),
    tags character varying[],
    avatar character varying(2000),
    start_work time without time zone,
    end_work time without time zone,
    location character varying(100),
    average_check integer,
    approved boolean,
    pending boolean,
    rejected boolean,
    user_id integer,
    photos character varying(200)[],
    phone character varying
);
 "   DROP TABLE public.establishments;
       public         heap    postgres    false    209            ?            1259    65602 	   favorites    TABLE     ?   CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    user_id integer,
    establishment_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.favorites;
       public         heap    postgres    false            ?            1259    65607    favorites_favorite_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.favorites_favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.favorites_favorite_id_seq;
       public          postgres    false    219            ,           0    0    favorites_favorite_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;
          public          postgres    false    220            ?            1259    57408    reviews    TABLE       CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    text character varying(150),
    "check" integer,
    user_id integer,
    establishment_id integer,
    rating double precision,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            ?            1259    57417    reviews_review_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    217            -           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    218            ?            1259    16476    token_id_seq    SEQUENCE     u   CREATE SEQUENCE public.token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.token_id_seq;
       public          postgres    false            ?            1259    16461    tokens    TABLE     ?   CREATE TABLE public.tokens (
    token_id integer DEFAULT nextval('public.token_id_seq'::regclass) NOT NULL,
    refresh_token character varying,
    created_at date,
    updated_at date,
    user_id integer
);
    DROP TABLE public.tokens;
       public         heap    postgres    false    216            ?            1259    16431    type_establishments    TABLE     ?   CREATE TABLE public.type_establishments (
    type_id integer NOT NULL,
    title character varying(255),
    created_at date,
    updated_at date
);
 '   DROP TABLE public.type_establishments;
       public         heap    postgres    false            ?            1259    16430    type_establishments_type_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.type_establishments_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.type_establishments_type_id_seq;
       public          postgres    false    212            .           0    0    type_establishments_type_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.type_establishments_type_id_seq OWNED BY public.type_establishments.type_id;
          public          postgres    false    211            ?            1259    65618 	   type_news    TABLE     ?   CREATE TABLE public.type_news (
    type_news_id integer NOT NULL,
    type character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.type_news;
       public         heap    postgres    false            ?            1259    16438    users_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false            ?            1259    16439    users    TABLE     B  CREATE TABLE public.users (
    user_id integer DEFAULT nextval('public.users_user_id_seq'::regclass) NOT NULL,
    name character varying(50),
    email character varying(45),
    picture character varying(200),
    admin boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false    213            ~           2604    65608    favorites favorite_id    DEFAULT     ~   ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);
 D   ALTER TABLE public.favorites ALTER COLUMN favorite_id DROP DEFAULT;
       public          postgres    false    220    219            }           2604    57418    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    218    217            z           2604    16434    type_establishments type_id    DEFAULT     ?   ALTER TABLE ONLY public.type_establishments ALTER COLUMN type_id SET DEFAULT nextval('public.type_establishments_type_id_seq'::regclass);
 J   ALTER TABLE public.type_establishments ALTER COLUMN type_id DROP DEFAULT;
       public          postgres    false    212    211    212                      0    16422    establishments 
   TABLE DATA           ?   COPY public.establishments (establishment_id, title, created_at, updated_at, type, tags, avatar, start_work, end_work, location, average_check, approved, pending, rejected, user_id, photos, phone) FROM stdin;
    public          postgres    false    210   ?4       #          0    65602 	   favorites 
   TABLE DATA           c   COPY public.favorites (favorite_id, user_id, establishment_id, created_at, updated_at) FROM stdin;
    public          postgres    false    219   l6       !          0    57408    reviews 
   TABLE DATA           v   COPY public.reviews (review_id, text, "check", user_id, establishment_id, rating, created_at, updated_at) FROM stdin;
    public          postgres    false    217   ?6                 0    16461    tokens 
   TABLE DATA           Z   COPY public.tokens (token_id, refresh_token, created_at, updated_at, user_id) FROM stdin;
    public          postgres    false    215   7                 0    16431    type_establishments 
   TABLE DATA           U   COPY public.type_establishments (type_id, title, created_at, updated_at) FROM stdin;
    public          postgres    false    212   ?7       %          0    65618 	   type_news 
   TABLE DATA           O   COPY public.type_news (type_news_id, type, created_at, updated_at) FROM stdin;
    public          postgres    false    221   H8                 0    16439    users 
   TABLE DATA           ]   COPY public.users (user_id, name, email, picture, admin, created_at, updated_at) FROM stdin;
    public          postgres    false    214   ?8       /           0    0 #   establishments_establishment_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.establishments_establishment_id_seq', 619, true);
          public          postgres    false    209            0           0    0    favorites_favorite_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 267, true);
          public          postgres    false    220            1           0    0    reviews_review_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.reviews_review_id_seq', 426, true);
          public          postgres    false    218            2           0    0    token_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.token_id_seq', 2961, true);
          public          postgres    false    216            3           0    0    type_establishments_type_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.type_establishments_type_id_seq', 1, true);
          public          postgres    false    211            4           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 36, true);
          public          postgres    false    213            ?           2606    16428    establishments PRIMARY 
   CONSTRAINT     d   ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT "PRIMARY" PRIMARY KEY (establishment_id);
 B   ALTER TABLE ONLY public.establishments DROP CONSTRAINT "PRIMARY";
       public            postgres    false    210            ?           2606    16437     type_establishments PRIMARY00000 
   CONSTRAINT     e   ALTER TABLE ONLY public.type_establishments
    ADD CONSTRAINT "PRIMARY00000" PRIMARY KEY (type_id);
 L   ALTER TABLE ONLY public.type_establishments DROP CONSTRAINT "PRIMARY00000";
       public            postgres    false    212            ?           2606    16445    users PRIMARY00001 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PRIMARY00001" PRIMARY KEY (user_id);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT "PRIMARY00001";
       public            postgres    false    214            ?           2606    65606    favorites favorites_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);
 B   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_pkey;
       public            postgres    false    219            ?           2606    57416    reviews reviews_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    217            ?           2606    16469    tokens tokens_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token_id);
 <   ALTER TABLE ONLY public.tokens DROP CONSTRAINT tokens_pkey;
       public            postgres    false    215            ?           2606    65624    type_news type_news_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.type_news
    ADD CONSTRAINT type_news_pkey PRIMARY KEY (type_news_id);
 B   ALTER TABLE ONLY public.type_news DROP CONSTRAINT type_news_pkey;
       public            postgres    false    221            ?           1259    16429    establishment_id_UNIQUE    INDEX     g   CREATE UNIQUE INDEX "establishment_id_UNIQUE" ON public.establishments USING btree (establishment_id);
 -   DROP INDEX public."establishment_id_UNIQUE";
       public            postgres    false    210               ?  x????j?@????mc?3W?m??J?F(^????ڔ??5?P?8:
"D1????Q`?^??F?a???8	0?9?\Pc???????	}??(Ð?0X??.?(^??b?7??n?????:?i&9?T?Щg?y"?i"iLR??woD??|g?????,?e?/???TZWS?Щ;???˧????>??,??????]??z?'M?K˦???}??tX0?W0?>?;?c????X??"__????V??(?訳????.?	??[?Ӡ6?˳?`?<?y?5Gۮm@6?????pČ@?& f??O?X?X??????7? b?f -X2 ?=G??m@??????k n??	?4q3?Ҋ?c??s???d<d5?+h{?0/ 0??4?o????h۵??&?v?p?8???      #   n   x?uϱ1D?XT?N??j???0"?E??_????Xz?\??`;o?T?n'??O?lce??=?=%???ۓZ?8$?).ݞԋ??ߤ??????ir?Q;=??>rA      !      x?????? ? ?         ?   x?M??
?0E??_Z?W?.UT^i"q? ?ب$i???j?޸sq?,?9I??Id?j??Y$L?o끘??G?͒8p'" ?`j?wKU??9?????????QZɗ????3mثڸXc???趌?.C?E?6?/d?Zo?ŀjj?ȕ??8??cv4?E=??????8N????kZ? ???'???;??}?ZEt         ]   x?3?J-.?/J,?+???".cN?ĴT(Ǆ?)??6?tJM-R ?OL??,??M??1???K-??r?9?sJ??CN??????$?I1z\\\ |!?      %   ,   x?3?tO?K-J????".#??ĜT(ǘӵ,5?ʋ???? 9??         2  x???KN?@ ??u{
/??̔?#1??mMxH		)P?<??v(??ĥ	W?莘??72>?????i???[!?? ??Y ????\?X?[d???#$J?<\fa:?	??P?l?jͅ???n???]?'?vy?8??t?YM????ifbi(??B$?@??	?VI?4]65?P?k?{?=?O|?_????Ǳ?A?fR?]V?9??U?κ?D???5ӃĿl???X*?5?uA??K]???G?q?u5x9VS????n???𮜼?9??V??ڿ#?r&???ߖ??۞,??'m??T     