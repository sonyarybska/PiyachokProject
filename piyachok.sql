PGDMP     %            	         {            PiyachokWeb    14.6    14.6 3    2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            5           1262    16420    PiyachokWeb    DATABASE     k   CREATE DATABASE "PiyachokWeb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Ukraine.1251';
    DROP DATABASE "PiyachokWeb";
                postgres    false            �            1259    16421 #   establishments_establishment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.establishments_establishment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.establishments_establishment_id_seq;
       public          postgres    false            �            1259    16422    establishments    TABLE     �  CREATE TABLE public.establishments (
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
    view_statistics character varying,
    average_check integer,
    approved boolean,
    pending boolean,
    rejected boolean,
    user_id integer,
    photos character varying(200)[],
    phone character varying
);
 "   DROP TABLE public.establishments;
       public         heap    postgres    false    209            �            1259    65602 	   favorites    TABLE     �   CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    user_id integer,
    establishment_id integer,
    created_at time without time zone,
    updated_at time without time zone
);
    DROP TABLE public.favorites;
       public         heap    postgres    false            �            1259    65607    favorites_favorite_id_seq    SEQUENCE     �   CREATE SEQUENCE public.favorites_favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.favorites_favorite_id_seq;
       public          postgres    false    219            6           0    0    favorites_favorite_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;
          public          postgres    false    220            �            1259    65609    news    TABLE       CREATE TABLE public.news (
    news_id integer NOT NULL,
    text character varying(150),
    photo character varying,
    type character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    establishment_id integer
);
    DROP TABLE public.news;
       public         heap    postgres    false            �            1259    65614    news_news_id_seq    SEQUENCE     y   CREATE SEQUENCE public.news_news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.news_news_id_seq;
       public          postgres    false    221            7           0    0    news_news_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.news_news_id_seq OWNED BY public.news.news_id;
          public          postgres    false    222            �            1259    57408    reviews    TABLE       CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    text character varying(150),
    "check" integer,
    user_id integer,
    establishment_id integer,
    created_at time without time zone,
    updated_at time without time zone,
    rating integer
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    57417    reviews_review_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    217            8           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    218            �            1259    16476    token_id_seq    SEQUENCE     u   CREATE SEQUENCE public.token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.token_id_seq;
       public          postgres    false            �            1259    16461    tokens    TABLE     �   CREATE TABLE public.tokens (
    token_id integer DEFAULT nextval('public.token_id_seq'::regclass) NOT NULL,
    refresh_token character varying,
    created_at date,
    updated_at date,
    user_id integer
);
    DROP TABLE public.tokens;
       public         heap    postgres    false    216            �            1259    16431    type_establishments    TABLE     �   CREATE TABLE public.type_establishments (
    type_id integer NOT NULL,
    title character varying(255),
    created_at date,
    updated_at date
);
 '   DROP TABLE public.type_establishments;
       public         heap    postgres    false            �            1259    16430    type_establishments_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.type_establishments_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.type_establishments_type_id_seq;
       public          postgres    false    212            9           0    0    type_establishments_type_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.type_establishments_type_id_seq OWNED BY public.type_establishments.type_id;
          public          postgres    false    211            �            1259    65618 	   type_news    TABLE     �   CREATE TABLE public.type_news (
    type_news_id integer NOT NULL,
    type character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.type_news;
       public         heap    postgres    false            �            1259    16438    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false            �            1259    16439    users    TABLE     Z  CREATE TABLE public.users (
    user_id integer DEFAULT nextval('public.users_user_id_seq'::regclass) NOT NULL,
    name character varying(50),
    email character varying(45),
    picture character varying(200),
    created_at character varying(45),
    updated_at character varying(45),
    admin boolean,
    phone_number character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false    213            �           2604    65608    favorites favorite_id    DEFAULT     ~   ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);
 D   ALTER TABLE public.favorites ALTER COLUMN favorite_id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    65615    news news_id    DEFAULT     l   ALTER TABLE ONLY public.news ALTER COLUMN news_id SET DEFAULT nextval('public.news_news_id_seq'::regclass);
 ;   ALTER TABLE public.news ALTER COLUMN news_id DROP DEFAULT;
       public          postgres    false    222    221            �           2604    57418    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    218    217                       2604    16434    type_establishments type_id    DEFAULT     �   ALTER TABLE ONLY public.type_establishments ALTER COLUMN type_id SET DEFAULT nextval('public.type_establishments_type_id_seq'::regclass);
 J   ALTER TABLE public.type_establishments ALTER COLUMN type_id DROP DEFAULT;
       public          postgres    false    211    212    212            "          0    16422    establishments 
   TABLE DATA           �   COPY public.establishments (establishment_id, title, created_at, updated_at, type, tags, avatar, start_work, end_work, location, view_statistics, average_check, approved, pending, rejected, user_id, photos, phone) FROM stdin;
    public          postgres    false    210   �<       +          0    65602 	   favorites 
   TABLE DATA           c   COPY public.favorites (favorite_id, user_id, establishment_id, created_at, updated_at) FROM stdin;
    public          postgres    false    219   0>       -          0    65609    news 
   TABLE DATA           d   COPY public.news (news_id, text, photo, type, created_at, updated_at, establishment_id) FROM stdin;
    public          postgres    false    221   �>       )          0    57408    reviews 
   TABLE DATA           v   COPY public.reviews (review_id, text, "check", user_id, establishment_id, created_at, updated_at, rating) FROM stdin;
    public          postgres    false    217   �>       '          0    16461    tokens 
   TABLE DATA           Z   COPY public.tokens (token_id, refresh_token, created_at, updated_at, user_id) FROM stdin;
    public          postgres    false    215   �?       $          0    16431    type_establishments 
   TABLE DATA           U   COPY public.type_establishments (type_id, title, created_at, updated_at) FROM stdin;
    public          postgres    false    212   A       /          0    65618 	   type_news 
   TABLE DATA           O   COPY public.type_news (type_news_id, type, created_at, updated_at) FROM stdin;
    public          postgres    false    223   uA       &          0    16439    users 
   TABLE DATA           k   COPY public.users (user_id, name, email, picture, created_at, updated_at, admin, phone_number) FROM stdin;
    public          postgres    false    214   �A       :           0    0 #   establishments_establishment_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.establishments_establishment_id_seq', 114, true);
          public          postgres    false    209            ;           0    0    favorites_favorite_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 110, true);
          public          postgres    false    220            <           0    0    news_news_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.news_news_id_seq', 1, false);
          public          postgres    false    222            =           0    0    reviews_review_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reviews_review_id_seq', 23, true);
          public          postgres    false    218            >           0    0    token_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.token_id_seq', 1881, true);
          public          postgres    false    216            ?           0    0    type_establishments_type_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.type_establishments_type_id_seq', 1, true);
          public          postgres    false    211            @           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 15, true);
          public          postgres    false    213            �           2606    16428    establishments PRIMARY 
   CONSTRAINT     d   ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT "PRIMARY" PRIMARY KEY (establishment_id);
 B   ALTER TABLE ONLY public.establishments DROP CONSTRAINT "PRIMARY";
       public            postgres    false    210            �           2606    16437     type_establishments PRIMARY00000 
   CONSTRAINT     e   ALTER TABLE ONLY public.type_establishments
    ADD CONSTRAINT "PRIMARY00000" PRIMARY KEY (type_id);
 L   ALTER TABLE ONLY public.type_establishments DROP CONSTRAINT "PRIMARY00000";
       public            postgres    false    212            �           2606    16445    users PRIMARY00001 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PRIMARY00001" PRIMARY KEY (user_id);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT "PRIMARY00001";
       public            postgres    false    214            �           2606    65606    favorites favorites_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);
 B   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_pkey;
       public            postgres    false    219            �           2606    65617    news news_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (news_id);
 8   ALTER TABLE ONLY public.news DROP CONSTRAINT news_pkey;
       public            postgres    false    221            �           2606    57416    reviews reviews_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    217            �           2606    16469    tokens tokens_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token_id);
 <   ALTER TABLE ONLY public.tokens DROP CONSTRAINT tokens_pkey;
       public            postgres    false    215            �           2606    65624    type_news type_news_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.type_news
    ADD CONSTRAINT type_news_pkey PRIMARY KEY (type_news_id);
 B   ALTER TABLE ONLY public.type_news DROP CONSTRAINT type_news_pkey;
       public            postgres    false    223            �           1259    16429    establishment_id_UNIQUE    INDEX     g   CREATE UNIQUE INDEX "establishment_id_UNIQUE" ON public.establishments USING btree (establishment_id);
 -   DROP INDEX public."establishment_id_UNIQUE";
       public            postgres    false    210            "   Z  x���]K�0���_Qv�2�9I�v� CE� Y����:�n c�݆EqLv�N79�dy^䌀�#q>�q@c�Y{6uSVj�j��̪ٞmjS�i��nj�鲨�w�j��yٔ�v��6xY���S�I�B�B��U��z� q70�~1��r�(��B�/MeL3�I�ɶ�v��8]��-�.*U��>0˚v����]�>硤�g/��t-�8	޳C��L Q����6՗G�D��A�j�rH|t]�[e��u���"Q�
3�v�RQ/�m��֑ Z�z���	�?�rN�V����Jq�+����G����?�]
�k��$��U���Or�s�      +   C   x�Uʻ A��A؀VP��_��"��L��3š[�^P�(@zC�
�ʯ�DZW,�e�zL�      -      x������ � �      )   )  x���AJC1�יS�af��$sW���Z��^��=�WЊP���ndj7Mx�+3�����a3,�E?�yDCl���(�����k@p�q.��I���u�׀L�����G����3���q��q7>��8>�ǵ��N8�L� 4����9c|��L?g㽞��ԡdmK���$�y�� ���H@��i��4>	��!6 �~�mF��q@f�Z��~X��1�[���n��T��	F�`}���Y۔CEO�zB�޺�j���$D��ؙ˦��Ⱦ5��V۱�!���7s���      '     x���Ks�0����e�aL�!Lg:	�V�<������tw�������4:,[S�r�Q��A-4C��!�s*� ��x�e���'`i�ߋ"�	�U�)l��>�qT6��t�^�U%;�1��:��~!�^���o��׾����Mg�
��vLӫ�vy���ȜڹՂ]�&׹��W�N�uU�f>F �韰��~a]��U�/Z�������/u2>�$��S]�F�m�s�̞ի7"����v��{6'k*_%����5w�����TQ�o�Ǐ      $   ]   x�3�����N�PHJ,��".#Π�����Ҽ��1�sbZ*�c��Wk�锚Z� T����Y���
�c����ZT	�s:�&A91z\\\ {�!�      /   ,   x�3�tO�K-J���".#��ĜT(ǘӵ,5�ʋ���� 9��      &   �  x����N�@�uy��ʹ�鴅&&�^P,�R*�H�h[nݙ�4����	>��D� �M��?��?9b�+���d���Nߒ��.�	I�
z��o9���8���Ew���+r!�����&��3��6x�Z����ҕr�t�؎[������^��/��ە�0#�A! 1Ҭ��R䰒a T!�-��f)%��2�#}Of~���iF];�kZ�>7
�A�ie#6��7:��#$c��6�4�-���B��F$�m�޸��cFwCVG�v�vhVz�Y�Jx��Z�����{�<�/#Ӟ���'�}�]\�8Y�{��]b�3]$tN�t��K�Z��'^;��#��HL��1p�I٭�ł3D�9�+W�s���B�/��:�J�9	ۅ���BM.�J}��&     