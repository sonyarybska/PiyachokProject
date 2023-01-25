PGDMP                          {            PiyachokWeb    14.6    14.6 5    7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            :           1262    16420    PiyachokWeb    DATABASE     k   CREATE DATABASE "PiyachokWeb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Ukraine.1251';
    DROP DATABASE "PiyachokWeb";
                postgres    false            �            1259    73799    establishment_reviews    TABLE     c   CREATE TABLE public.establishment_reviews (
    review_id integer,
    establishment_id integer
);
 )   DROP TABLE public.establishment_reviews;
       public         heap    postgres    false            �            1259    16421 #   establishments_establishment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.establishments_establishment_id_seq
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
       public          postgres    false    219            ;           0    0    favorites_favorite_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;
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
       public          postgres    false    221            <           0    0    news_news_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.news_news_id_seq OWNED BY public.news.news_id;
          public          postgres    false    222            �            1259    57408    reviews    TABLE       CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    text character varying(150),
    "check" integer,
    user_id integer,
    establishment_id integer,
    created_at time without time zone,
    updated_at time without time zone,
    rating double precision
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    57417    reviews_review_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    217            =           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
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
       public          postgres    false    212            >           0    0    type_establishments_type_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.type_establishments_type_id_seq OWNED BY public.type_establishments.type_id;
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
       public          postgres    false    218    217            �           2604    16434    type_establishments type_id    DEFAULT     �   ALTER TABLE ONLY public.type_establishments ALTER COLUMN type_id SET DEFAULT nextval('public.type_establishments_type_id_seq'::regclass);
 J   ALTER TABLE public.type_establishments ALTER COLUMN type_id DROP DEFAULT;
       public          postgres    false    212    211    212            4          0    73799    establishment_reviews 
   TABLE DATA           L   COPY public.establishment_reviews (review_id, establishment_id) FROM stdin;
    public          postgres    false    224   �>       &          0    16422    establishments 
   TABLE DATA           �   COPY public.establishments (establishment_id, title, created_at, updated_at, type, tags, avatar, start_work, end_work, location, view_statistics, average_check, approved, pending, rejected, user_id, photos, phone) FROM stdin;
    public          postgres    false    210   �>       /          0    65602 	   favorites 
   TABLE DATA           c   COPY public.favorites (favorite_id, user_id, establishment_id, created_at, updated_at) FROM stdin;
    public          postgres    false    219   3C       1          0    65609    news 
   TABLE DATA           d   COPY public.news (news_id, text, photo, type, created_at, updated_at, establishment_id) FROM stdin;
    public          postgres    false    221   cD       -          0    57408    reviews 
   TABLE DATA           v   COPY public.reviews (review_id, text, "check", user_id, establishment_id, created_at, updated_at, rating) FROM stdin;
    public          postgres    false    217   �D       +          0    16461    tokens 
   TABLE DATA           Z   COPY public.tokens (token_id, refresh_token, created_at, updated_at, user_id) FROM stdin;
    public          postgres    false    215   6E       (          0    16431    type_establishments 
   TABLE DATA           U   COPY public.type_establishments (type_id, title, created_at, updated_at) FROM stdin;
    public          postgres    false    212   F       3          0    65618 	   type_news 
   TABLE DATA           O   COPY public.type_news (type_news_id, type, created_at, updated_at) FROM stdin;
    public          postgres    false    223   uF       *          0    16439    users 
   TABLE DATA           k   COPY public.users (user_id, name, email, picture, created_at, updated_at, admin, phone_number) FROM stdin;
    public          postgres    false    214   �F       ?           0    0 #   establishments_establishment_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.establishments_establishment_id_seq', 324, true);
          public          postgres    false    209            @           0    0    favorites_favorite_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 218, true);
          public          postgres    false    220            A           0    0    news_news_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.news_news_id_seq', 1, false);
          public          postgres    false    222            B           0    0    reviews_review_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.reviews_review_id_seq', 172, true);
          public          postgres    false    218            C           0    0    token_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.token_id_seq', 2543, true);
          public          postgres    false    216            D           0    0    type_establishments_type_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.type_establishments_type_id_seq', 1, true);
          public          postgres    false    211            E           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 23, true);
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
       public            postgres    false    210            4      x������ � �      &   2  x��X]��6}V~���>4^�-�o���βC������o{�8)C��^9�Ė-�0eH��:��s�Ց	��zS���u�T�u�]1	!
1�	����cc�/����q�W���j3�a8��f�����b�����EY�ͿÒf0�i���y�h�B�	�i�%�7_�?(b�b&���ˢܩ��&W���Һ����TQ��T�X�;=w�.x��Ԧ�.+�@����Af�0���#��>������kc'�W�#���
�'ap���e�TE��[��1S�/�DU`�8,5�-W�>��p-n����UFa���T�����
�._҅Z���l�i����^@��<TY_�6ɜ�:�����'/D���hBLy��|���M�Z��v��b������1��h>�,uB�����g��1:N�P�2��W_E}�Z��FN�T�B��.F�Ȣ��
�j����H+4XRO�6�|�Gh����R���*b-�^�Wݬl�V�ǒs�B-ܣ�ۆOo��>���VUڡ�k���J���M>`��	�}G�8n���^�_�r<�T��Ĉm7�e��l�����[+��CpI�~�.����rp���m��0v_.a&�	\ZU&tu���:�ﵮ�+&`��v�½�R�$'�<��	.���/�lm��0vw�qr6�%hԾ�I<�лI�HD&ߏG�/[�h>����<��6g���vP�1�X���y�h�9z�>r2���1���ˢ�w�莹cK�CU��j��>��B��!��<<n������HX�=��	ا�������"�_�Ґ9dR��%R��^ƦݛC��b��;;�oo��R�����Xa���&?��Wv�mӞ��۞��_B2�G�О��=�C!�zEƆ
�K��E>�������DFzT��wU��v�7-B,���5�-�y�A��#�'���7��>(�thχ*���&��(�}���?�uj��]��u�X�]�K��]�>/�k�@�4�S��Sܓ�����	\���p8kXDO�6�|�G��|�o=�����d2��Ǭ�      /      x�U�ۭ� �C1��k��ױ�\�Eь��}d_���L=V�&���=�R,UI\4�Ŏ���)�@�'Z���F2���ؑj<*�3=�g�&�O����>hq@$7����&��^ߙT�@��h�0m�-MD~���]h�@��Gc�Y�'/�>4�NN��$Mp����`1�ٕ�U@�n���t����7��;Yɉp�:�y�� "���>� "��띱!-�������|��Ht@4n���
 ��Ş:i�Y �����G/�����yҙ9      1      x������ � �      -   �   x�]��
AE��W��I�ɔ����,�"�0����F�Ef�'�Kn(����Sw�����H�b�R(b4���(+l�3��}SR.�H�+@K����'���P(�1�
���{V�%�sVI-�m�7��V4�UB�����.��/�n�rɝ�9���<�      +   �   x�U���0Eѱ��^�ĩ�����3N��-ш"|�u���^`ϭ�y�y�1�>F*�����\`sOc�_�D�c
���CgyBx��p*!笕�A�w^�g�|-}����W
��E�©�P�����КYa��q���i��,6~cC��s{nt�c����`1G�W�f`���D�j'CӴ/�E�      (   ]   x�3�����N�PHJ,��".#Π�����Ҽ��1�sbZ*�c��Wk�锚Z� T����Y���
�c����ZT	�s:�&A91z\\\ {�!�      3   ,   x�3�tO�K-J���".#��ĜT(ǘӵ,5�ʋ���� 9��      *   Q  x���ON�@F��)�7m�73��IL$օ��?)��(-��ږ��ܛx������`b���僊`zQY<q��0�u��3w)�x&y�d\U��(~���ȼt�so�o��V��F+�^�U-�t�U���Nu�Y!�|�,C�;�@#<�*L	a"#�1� �F96̘t�GhcN������o�	�k�]~�����(�׏��|�j9��R��`����fz>7�+��ef`�e2�����[����+D����8�m!B8o�-sǹg�g����qC�����{!���-�m�w����9pD8P���/hLtN5E�y�����,��G     