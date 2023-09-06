--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Ubuntu 15.4-1.pgdg22.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg22.04+1)

-- Started on 2023-09-05 02:54:56 -03

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


ALTER DATABASE basic_crud OWNER TO postgres;

\connect basic_crud

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

--
-- TOC entry 214 (class 1259 OID 16413)
-- Name: country_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.country_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16414)
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    id integer DEFAULT nextval('public.country_seq'::regclass) NOT NULL,
    iso character(2) NOT NULL,
    name character varying(80) NOT NULL,
    nicename character varying(80) NOT NULL,
    iso3 character(3) DEFAULT NULL::bpchar,
    numcode smallint NOT NULL,
    phonecode integer NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16419)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) DEFAULT 'John Doe'::character varying NOT NULL,
    age smallint DEFAULT 18 NOT NULL,
    numcode smallint DEFAULT 0 NOT NULL,
    date_added timestamp with time zone DEFAULT LOCALTIMESTAMP NOT NULL,
    last_modify timestamp with time zone DEFAULT LOCALTIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16427)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3224 (class 2604 OID 16428)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3379 (class 0 OID 16414)
-- Dependencies: 215
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.country VALUES (1, 'AF', 'AFGHANISTAN', 'Afghanistan', 'AFG', 4, 93) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (2, 'AL', 'ALBANIA', 'Albania', 'ALB', 8, 355) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (3, 'DZ', 'ALGERIA', 'Algeria', 'DZA', 12, 213) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (4, 'AS', 'AMERICAN SAMOA', 'American Samoa', 'ASM', 16, 1684) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (5, 'AD', 'ANDORRA', 'Andorra', 'AND', 20, 376) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (6, 'AO', 'ANGOLA', 'Angola', 'AGO', 24, 244) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (7, 'AI', 'ANGUILLA', 'Anguilla', 'AIA', 660, 1264) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (8, 'AQ', 'ANTARCTICA', 'Antarctica', 'ATA', 10, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (9, 'AG', 'ANTIGUA AND BARBUDA', 'Antigua and Barbuda', 'ATG', 28, 1268) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (10, 'AR', 'ARGENTINA', 'Argentina', 'ARG', 32, 54) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (11, 'AM', 'ARMENIA', 'Armenia', 'ARM', 51, 374) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (12, 'AW', 'ARUBA', 'Aruba', 'ABW', 533, 297) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (13, 'AU', 'AUSTRALIA', 'Australia', 'AUS', 36, 61) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (14, 'AT', 'AUSTRIA', 'Austria', 'AUT', 40, 43) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (15, 'AZ', 'AZERBAIJAN', 'Azerbaijan', 'AZE', 31, 994) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (16, 'BS', 'BAHAMAS', 'Bahamas', 'BHS', 44, 1242) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (17, 'BH', 'BAHRAIN', 'Bahrain', 'BHR', 48, 973) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (18, 'BD', 'BANGLADESH', 'Bangladesh', 'BGD', 50, 880) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (19, 'BB', 'BARBADOS', 'Barbados', 'BRB', 52, 1246) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (20, 'BY', 'BELARUS', 'Belarus', 'BLR', 112, 375) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (21, 'BE', 'BELGIUM', 'Belgium', 'BEL', 56, 32) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (22, 'BZ', 'BELIZE', 'Belize', 'BLZ', 84, 501) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (23, 'BJ', 'BENIN', 'Benin', 'BEN', 204, 229) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (24, 'BM', 'BERMUDA', 'Bermuda', 'BMU', 60, 1441) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (25, 'BT', 'BHUTAN', 'Bhutan', 'BTN', 64, 975) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (26, 'BO', 'BOLIVIA', 'Bolivia', 'BOL', 68, 591) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (27, 'BA', 'BOSNIA AND HERZEGOVINA', 'Bosnia and Herzegovina', 'BIH', 70, 387) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (28, 'BW', 'BOTSWANA', 'Botswana', 'BWA', 72, 267) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (29, 'BV', 'BOUVET ISLAND', 'Bouvet Island', 'BVT', 74, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (30, 'BR', 'BRAZIL', 'Brazil', 'BRA', 76, 55) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (31, 'IO', 'BRITISH INDIAN OCEAN TERRITORY', 'British Indian Ocean Territory', 'IOT', 86, 246) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (32, 'BN', 'BRUNEI DARUSSALAM', 'Brunei Darussalam', 'BRN', 96, 673) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (33, 'BG', 'BULGARIA', 'Bulgaria', 'BGR', 100, 359) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (34, 'BF', 'BURKINA FASO', 'Burkina Faso', 'BFA', 854, 226) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (35, 'BI', 'BURUNDI', 'Burundi', 'BDI', 108, 257) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (36, 'KH', 'CAMBODIA', 'Cambodia', 'KHM', 116, 855) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (37, 'CM', 'CAMEROON', 'Cameroon', 'CMR', 120, 237) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (38, 'CA', 'CANADA', 'Canada', 'CAN', 124, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (39, 'CV', 'CAPE VERDE', 'Cape Verde', 'CPV', 132, 238) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (40, 'KY', 'CAYMAN ISLANDS', 'Cayman Islands', 'CYM', 136, 1345) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (41, 'CF', 'CENTRAL AFRICAN REPUBLIC', 'Central African Republic', 'CAF', 140, 236) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (42, 'TD', 'CHAD', 'Chad', 'TCD', 148, 235) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (43, 'CL', 'CHILE', 'Chile', 'CHL', 152, 56) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (44, 'CN', 'CHINA', 'China', 'CHN', 156, 86) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (45, 'CX', 'CHRISTMAS ISLAND', 'Christmas Island', 'CXR', 162, 61) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (47, 'CO', 'COLOMBIA', 'Colombia', 'COL', 170, 57) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (48, 'KM', 'COMOROS', 'Comoros', 'COM', 174, 269) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (49, 'CG', 'CONGO', 'Congo', 'COG', 178, 242) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (50, 'CD', 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', 'Congo, the Democratic Republic of the', 'COD', 180, 243) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (51, 'CK', 'COOK ISLANDS', 'Cook Islands', 'COK', 184, 682) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (52, 'CR', 'COSTA RICA', 'Costa Rica', 'CRI', 188, 506) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (53, 'CI', 'COTE D''IVOIRE', 'Cote D''Ivoire', 'CIV', 384, 225) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (54, 'HR', 'CROATIA', 'Croatia', 'HRV', 191, 385) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (55, 'CU', 'CUBA', 'Cuba', 'CUB', 192, 53) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (56, 'CY', 'CYPRUS', 'Cyprus', 'CYP', 196, 357) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (57, 'CZ', 'CZECHIA', 'Czech Republic', 'CZE', 203, 420) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (58, 'DK', 'DENMARK', 'Denmark', 'DNK', 208, 45) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (59, 'DJ', 'DJIBOUTI', 'Djibouti', 'DJI', 262, 253) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (60, 'DM', 'DOMINICA', 'Dominica', 'DMA', 212, 1767) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (61, 'DO', 'DOMINICAN REPUBLIC', 'Dominican Republic', 'DOM', 214, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (62, 'EC', 'ECUADOR', 'Ecuador', 'ECU', 218, 593) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (63, 'EG', 'EGYPT', 'Egypt', 'EGY', 818, 20) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (64, 'SV', 'EL SALVADOR', 'El Salvador', 'SLV', 222, 503) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (65, 'GQ', 'EQUATORIAL GUINEA', 'Equatorial Guinea', 'GNQ', 226, 240) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (66, 'ER', 'ERITREA', 'Eritrea', 'ERI', 232, 291) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (67, 'EE', 'ESTONIA', 'Estonia', 'EST', 233, 372) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (68, 'ET', 'ETHIOPIA', 'Ethiopia', 'ETH', 231, 251) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (69, 'FK', 'FALKLAND ISLANDS (MALVINAS)', 'Falkland Islands (Malvinas)', 'FLK', 238, 500) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (70, 'FO', 'FAROE ISLANDS', 'Faroe Islands', 'FRO', 234, 298) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (71, 'FJ', 'FIJI', 'Fiji', 'FJI', 242, 679) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (72, 'FI', 'FINLAND', 'Finland', 'FIN', 246, 358) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (73, 'FR', 'FRANCE', 'France', 'FRA', 250, 33) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (74, 'GF', 'FRENCH GUIANA', 'French Guiana', 'GUF', 254, 594) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (75, 'PF', 'FRENCH POLYNESIA', 'French Polynesia', 'PYF', 258, 689) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (76, 'TF', 'FRENCH SOUTHERN TERRITORIES', 'French Southern Territories', 'ATF', 260, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (77, 'GA', 'GABON', 'Gabon', 'GAB', 266, 241) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (78, 'GM', 'GAMBIA', 'Gambia', 'GMB', 270, 220) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (79, 'GE', 'GEORGIA', 'Georgia', 'GEO', 268, 995) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (80, 'DE', 'GERMANY', 'Germany', 'DEU', 276, 49) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (81, 'GH', 'GHANA', 'Ghana', 'GHA', 288, 233) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (82, 'GI', 'GIBRALTAR', 'Gibraltar', 'GIB', 292, 350) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (83, 'GR', 'GREECE', 'Greece', 'GRC', 300, 30) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (84, 'GL', 'GREENLAND', 'Greenland', 'GRL', 304, 299) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (85, 'GD', 'GRENADA', 'Grenada', 'GRD', 308, 1473) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (86, 'GP', 'GUADELOUPE', 'Guadeloupe', 'GLP', 312, 590) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (87, 'GU', 'GUAM', 'Guam', 'GUM', 316, 1671) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (88, 'GT', 'GUATEMALA', 'Guatemala', 'GTM', 320, 502) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (89, 'GN', 'GUINEA', 'Guinea', 'GIN', 324, 224) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (90, 'GW', 'GUINEA-BISSAU', 'Guinea-Bissau', 'GNB', 624, 245) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (91, 'GY', 'GUYANA', 'Guyana', 'GUY', 328, 592) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (92, 'HT', 'HAITI', 'Haiti', 'HTI', 332, 509) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (93, 'HM', 'HEARD ISLAND AND MCDONALD ISLANDS', 'Heard Island and Mcdonald Islands', 'HMD', 334, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (94, 'VA', 'HOLY SEE (VATICAN CITY STATE)', 'Holy See (Vatican City State)', 'VAT', 336, 39) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (95, 'HN', 'HONDURAS', 'Honduras', 'HND', 340, 504) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (96, 'HK', 'HONG KONG', 'Hong Kong', 'HKG', 344, 852) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (97, 'HU', 'HUNGARY', 'Hungary', 'HUN', 348, 36) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (98, 'IS', 'ICELAND', 'Iceland', 'ISL', 352, 354) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (99, 'IN', 'INDIA', 'India', 'IND', 356, 91) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (100, 'ID', 'INDONESIA', 'Indonesia', 'IDN', 360, 62) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (101, 'IR', 'IRAN, ISLAMIC REPUBLIC OF', 'Iran, Islamic Republic of', 'IRN', 364, 98) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (102, 'IQ', 'IRAQ', 'Iraq', 'IRQ', 368, 964) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (103, 'IE', 'IRELAND', 'Ireland', 'IRL', 372, 353) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (104, 'IL', 'ISRAEL', 'Israel', 'ISR', 376, 972) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (105, 'IT', 'ITALY', 'Italy', 'ITA', 380, 39) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (106, 'JM', 'JAMAICA', 'Jamaica', 'JAM', 388, 1876) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (107, 'JP', 'JAPAN', 'Japan', 'JPN', 392, 81) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (108, 'JO', 'JORDAN', 'Jordan', 'JOR', 400, 962) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (109, 'KZ', 'KAZAKHSTAN', 'Kazakhstan', 'KAZ', 398, 7) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (110, 'KE', 'KENYA', 'Kenya', 'KEN', 404, 254) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (111, 'KI', 'KIRIBATI', 'Kiribati', 'KIR', 296, 686) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (112, 'KP', 'KOREA, DEMOCRATIC PEOPLE''S REPUBLIC OF', 'Korea, Democratic People''s Republic of', 'PRK', 408, 850) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (113, 'KR', 'KOREA, REPUBLIC OF', 'Korea, Republic of', 'KOR', 410, 82) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (114, 'KW', 'KUWAIT', 'Kuwait', 'KWT', 414, 965) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (115, 'KG', 'KYRGYZSTAN', 'Kyrgyzstan', 'KGZ', 417, 996) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (116, 'LA', 'LAO PEOPLE''S DEMOCRATIC REPUBLIC', 'Lao People''s Democratic Republic', 'LAO', 418, 856) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (117, 'LV', 'LATVIA', 'Latvia', 'LVA', 428, 371) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (118, 'LB', 'LEBANON', 'Lebanon', 'LBN', 422, 961) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (119, 'LS', 'LESOTHO', 'Lesotho', 'LSO', 426, 266) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (120, 'LR', 'LIBERIA', 'Liberia', 'LBR', 430, 231) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (121, 'LY', 'LIBYAN ARAB JAMAHIRIYA', 'Libyan Arab Jamahiriya', 'LBY', 434, 218) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (122, 'LI', 'LIECHTENSTEIN', 'Liechtenstein', 'LIE', 438, 423) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (123, 'LT', 'LITHUANIA', 'Lithuania', 'LTU', 440, 370) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (124, 'LU', 'LUXEMBOURG', 'Luxembourg', 'LUX', 442, 352) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (125, 'MO', 'MACAO', 'Macao', 'MAC', 446, 853) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (126, 'MK', 'NORTH MACEDONIA', 'North Macedonia', 'MKD', 807, 389) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (127, 'MG', 'MADAGASCAR', 'Madagascar', 'MDG', 450, 261) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (128, 'MW', 'MALAWI', 'Malawi', 'MWI', 454, 265) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (129, 'MY', 'MALAYSIA', 'Malaysia', 'MYS', 458, 60) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (130, 'MV', 'MALDIVES', 'Maldives', 'MDV', 462, 960) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (131, 'ML', 'MALI', 'Mali', 'MLI', 466, 223) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (132, 'MT', 'MALTA', 'Malta', 'MLT', 470, 356) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (133, 'MH', 'MARSHALL ISLANDS', 'Marshall Islands', 'MHL', 584, 692) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (134, 'MQ', 'MARTINIQUE', 'Martinique', 'MTQ', 474, 596) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (135, 'MR', 'MAURITANIA', 'Mauritania', 'MRT', 478, 222) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (136, 'MU', 'MAURITIUS', 'Mauritius', 'MUS', 480, 230) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (137, 'YT', 'MAYOTTE', 'Mayotte', 'MYT', 175, 269) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (138, 'MX', 'MEXICO', 'Mexico', 'MEX', 484, 52) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (139, 'FM', 'MICRONESIA, FEDERATED STATES OF', 'Micronesia, Federated States of', 'FSM', 583, 691) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (140, 'MD', 'MOLDOVA, REPUBLIC OF', 'Moldova, Republic of', 'MDA', 498, 373) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (141, 'MC', 'MONACO', 'Monaco', 'MCO', 492, 377) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (142, 'MN', 'MONGOLIA', 'Mongolia', 'MNG', 496, 976) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (143, 'MS', 'MONTSERRAT', 'Montserrat', 'MSR', 500, 1664) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (144, 'MA', 'MOROCCO', 'Morocco', 'MAR', 504, 212) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (145, 'MZ', 'MOZAMBIQUE', 'Mozambique', 'MOZ', 508, 258) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (146, 'MM', 'MYANMAR', 'Myanmar', 'MMR', 104, 95) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (147, 'NA', 'NAMIBIA', 'Namibia', 'NAM', 516, 264) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (148, 'NR', 'NAURU', 'Nauru', 'NRU', 520, 674) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (149, 'NP', 'NEPAL', 'Nepal', 'NPL', 524, 977) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (150, 'NL', 'NETHERLANDS', 'Netherlands', 'NLD', 528, 31) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (151, 'AN', 'NETHERLANDS ANTILLES', 'Netherlands Antilles', 'ANT', 530, 599) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (152, 'NC', 'NEW CALEDONIA', 'New Caledonia', 'NCL', 540, 687) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (153, 'NZ', 'NEW ZEALAND', 'New Zealand', 'NZL', 554, 64) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (154, 'NI', 'NICARAGUA', 'Nicaragua', 'NIC', 558, 505) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (155, 'NE', 'NIGER', 'Niger', 'NER', 562, 227) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (156, 'NG', 'NIGERIA', 'Nigeria', 'NGA', 566, 234) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (157, 'NU', 'NIUE', 'Niue', 'NIU', 570, 683) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (158, 'NF', 'NORFOLK ISLAND', 'Norfolk Island', 'NFK', 574, 672) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (159, 'MP', 'NORTHERN MARIANA ISLANDS', 'Northern Mariana Islands', 'MNP', 580, 1670) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (160, 'NO', 'NORWAY', 'Norway', 'NOR', 578, 47) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (161, 'OM', 'OMAN', 'Oman', 'OMN', 512, 968) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (162, 'PK', 'PAKISTAN', 'Pakistan', 'PAK', 586, 92) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (163, 'PW', 'PALAU', 'Palau', 'PLW', 585, 680) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (165, 'PA', 'PANAMA', 'Panama', 'PAN', 591, 507) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (166, 'PG', 'PAPUA NEW GUINEA', 'Papua New Guinea', 'PNG', 598, 675) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (167, 'PY', 'PARAGUAY', 'Paraguay', 'PRY', 600, 595) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (168, 'PE', 'PERU', 'Peru', 'PER', 604, 51) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (169, 'PH', 'PHILIPPINES', 'Philippines', 'PHL', 608, 63) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (170, 'PN', 'PITCAIRN', 'Pitcairn', 'PCN', 612, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (171, 'PL', 'POLAND', 'Poland', 'POL', 616, 48) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (172, 'PT', 'PORTUGAL', 'Portugal', 'PRT', 620, 351) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (173, 'PR', 'PUERTO RICO', 'Puerto Rico', 'PRI', 630, 1787) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (174, 'QA', 'QATAR', 'Qatar', 'QAT', 634, 974) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (175, 'RE', 'REUNION', 'Reunion', 'REU', 638, 262) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (176, 'RO', 'ROMANIA', 'Romania', 'ROU', 642, 40) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (177, 'RU', 'RUSSIAN FEDERATION', 'Russian Federation', 'RUS', 643, 7) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (178, 'RW', 'RWANDA', 'Rwanda', 'RWA', 646, 250) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (179, 'SH', 'SAINT HELENA', 'Saint Helena', 'SHN', 654, 290) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (180, 'KN', 'SAINT KITTS AND NEVIS', 'Saint Kitts and Nevis', 'KNA', 659, 1869) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (181, 'LC', 'SAINT LUCIA', 'Saint Lucia', 'LCA', 662, 1758) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (182, 'PM', 'SAINT PIERRE AND MIQUELON', 'Saint Pierre and Miquelon', 'SPM', 666, 508) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (183, 'VC', 'SAINT VINCENT AND THE GRENADINES', 'Saint Vincent and the Grenadines', 'VCT', 670, 1784) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (184, 'WS', 'SAMOA', 'Samoa', 'WSM', 882, 684) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (185, 'SM', 'SAN MARINO', 'San Marino', 'SMR', 674, 378) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (186, 'ST', 'SAO TOME AND PRINCIPE', 'Sao Tome and Principe', 'STP', 678, 239) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (187, 'SA', 'SAUDI ARABIA', 'Saudi Arabia', 'SAU', 682, 966) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (188, 'SN', 'SENEGAL', 'Senegal', 'SEN', 686, 221) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (189, 'RS', 'SERBIA', 'Serbia', 'SRB', 688, 381) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (190, 'SC', 'SEYCHELLES', 'Seychelles', 'SYC', 690, 248) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (191, 'SL', 'SIERRA LEONE', 'Sierra Leone', 'SLE', 694, 232) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (192, 'SG', 'SINGAPORE', 'Singapore', 'SGP', 702, 65) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (193, 'SK', 'SLOVAKIA', 'Slovakia', 'SVK', 703, 421) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (194, 'SI', 'SLOVENIA', 'Slovenia', 'SVN', 705, 386) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (195, 'SB', 'SOLOMON ISLANDS', 'Solomon Islands', 'SLB', 90, 677) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (196, 'SO', 'SOMALIA', 'Somalia', 'SOM', 706, 252) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (197, 'ZA', 'SOUTH AFRICA', 'South Africa', 'ZAF', 710, 27) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (198, 'GS', 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', 'South Georgia and the South Sandwich Islands', 'SGS', 239, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (199, 'ES', 'SPAIN', 'Spain', 'ESP', 724, 34) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (200, 'LK', 'SRI LANKA', 'Sri Lanka', 'LKA', 144, 94) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (201, 'SD', 'SUDAN', 'Sudan', 'SDN', 736, 249) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (202, 'SR', 'SURINAME', 'Suriname', 'SUR', 740, 597) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (203, 'SJ', 'SVALBARD AND JAN MAYEN', 'Svalbard and Jan Mayen', 'SJM', 744, 47) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (204, 'SZ', 'SWAZILAND', 'Swaziland', 'SWZ', 748, 268) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (205, 'SE', 'SWEDEN', 'Sweden', 'SWE', 752, 46) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (206, 'CH', 'SWITZERLAND', 'Switzerland', 'CHE', 756, 41) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (207, 'SY', 'SYRIAN ARAB REPUBLIC', 'Syrian Arab Republic', 'SYR', 760, 963) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (208, 'TW', 'TAIWAN, PROVINCE OF CHINA', 'Taiwan, Province of China', 'TWN', 158, 886) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (209, 'TJ', 'TAJIKISTAN', 'Tajikistan', 'TJK', 762, 992) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (210, 'TZ', 'TANZANIA, UNITED REPUBLIC OF', 'Tanzania, United Republic of', 'TZA', 834, 255) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (211, 'TH', 'THAILAND', 'Thailand', 'THA', 764, 66) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (212, 'TL', 'TIMOR-LESTE', 'Timor-Leste', 'TLS', 626, 670) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (213, 'TG', 'TOGO', 'Togo', 'TGO', 768, 228) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (214, 'TK', 'TOKELAU', 'Tokelau', 'TKL', 772, 690) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (215, 'TO', 'TONGA', 'Tonga', 'TON', 776, 676) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (216, 'TT', 'TRINIDAD AND TOBAGO', 'Trinidad and Tobago', 'TTO', 780, 1868) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (217, 'TN', 'TUNISIA', 'Tunisia', 'TUN', 788, 216) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (218, 'TR', 'TÜRKIYE', 'Türkiye, The Republic of', 'TUR', 792, 90) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (219, 'TM', 'TURKMENISTAN', 'Turkmenistan', 'TKM', 795, 993) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (220, 'TC', 'TURKS AND CAICOS ISLANDS', 'Turks and Caicos Islands', 'TCA', 796, 1649) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (221, 'TV', 'TUVALU', 'Tuvalu', 'TUV', 798, 688) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (222, 'UG', 'UGANDA', 'Uganda', 'UGA', 800, 256) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (223, 'UA', 'UKRAINE', 'Ukraine', 'UKR', 804, 380) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (224, 'AE', 'UNITED ARAB EMIRATES', 'United Arab Emirates', 'ARE', 784, 971) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (225, 'GB', 'UNITED KINGDOM', 'United Kingdom', 'GBR', 826, 44) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (226, 'US', 'UNITED STATES', 'United States', 'USA', 840, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (227, 'UM', 'UNITED STATES MINOR OUTLYING ISLANDS', 'United States Minor Outlying Islands', 'UMI', 581, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (228, 'UY', 'URUGUAY', 'Uruguay', 'URY', 858, 598) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (229, 'UZ', 'UZBEKISTAN', 'Uzbekistan', 'UZB', 860, 998) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (230, 'VU', 'VANUATU', 'Vanuatu', 'VUT', 548, 678) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (231, 'VE', 'VENEZUELA', 'Venezuela', 'VEN', 862, 58) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (232, 'VN', 'VIET NAM', 'Viet Nam', 'VNM', 704, 84) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (233, 'VG', 'VIRGIN ISLANDS, BRITISH', 'Virgin Islands, British', 'VGB', 92, 1284) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (234, 'VI', 'VIRGIN ISLANDS, U.S.', 'Virgin Islands, U.s.', 'VIR', 850, 1340) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (235, 'WF', 'WALLIS AND FUTUNA', 'Wallis and Futuna', 'WLF', 876, 681) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (236, 'EH', 'WESTERN SAHARA', 'Western Sahara', 'ESH', 732, 212) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (237, 'YE', 'YEMEN', 'Yemen', 'YEM', 887, 967) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (238, 'ZM', 'ZAMBIA', 'Zambia', 'ZMB', 894, 260) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (239, 'ZW', 'ZIMBABWE', 'Zimbabwe', 'ZWE', 716, 263) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (240, 'ME', 'MONTENEGRO', 'Montenegro', 'MNE', 499, 382) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (241, 'XK', 'KOSOVO', 'Kosovo', 'XKX', 0, 383) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (242, 'AX', 'ALAND ISLANDS', 'Aland Islands', 'ALA', 248, 358) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (243, 'BQ', 'BONAIRE, SINT EUSTATIUS AND SABA', 'Bonaire, Sint Eustatius and Saba', 'BES', 535, 599) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (244, 'CW', 'CURACAO', 'Curacao', 'CUW', 531, 599) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (245, 'GG', 'GUERNSEY', 'Guernsey', 'GGY', 831, 44) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (246, 'IM', 'ISLE OF MAN', 'Isle of Man', 'IMN', 833, 44) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (247, 'JE', 'JERSEY', 'Jersey', 'JEY', 832, 44) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (248, 'BL', 'SAINT BARTHELEMY', 'Saint Barthelemy', 'BLM', 652, 590) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (249, 'MF', 'SAINT MARTIN', 'Saint Martin', 'MAF', 663, 590) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (250, 'SX', 'SINT MAARTEN', 'Sint Maarten', 'SXM', 534, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.country VALUES (251, 'SS', 'SOUTH SUDAN', 'South Sudan', 'SSD', 728, 211) ON CONFLICT DO NOTHING;


--
-- TOC entry 3380 (class 0 OID 16419)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (45, 'John Doe', 18, 4, '2023-09-05 02:49:52.967764-03', '2023-09-05 02:49:52.967764-03') ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (46, 'Jane Doe', 56, 533, '2023-09-05 02:49:52.967764-03', '2023-09-05 02:49:52.967764-03') ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (47, 'Eric John', 22, 12, '2023-09-05 02:49:52.967764-03', '2023-09-05 02:49:52.967764-03') ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (48, 'Zoe Elvis', 67, 16, '2023-09-05 02:49:52.967764-03', '2023-09-05 02:49:52.967764-03') ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (49, 'George Santos', 11, 10, '2023-09-05 02:49:52.967764-03', '2023-09-05 02:49:52.967764-03') ON CONFLICT DO NOTHING;


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 214
-- Name: country_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_seq', 1, false);


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 49, true);


--
-- TOC entry 3231 (class 2606 OID 16430)
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 16432)
-- Name: country un_data; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT un_data UNIQUE (iso, iso3, numcode, phonecode);


--
-- TOC entry 3235 (class 2606 OID 16434)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 214
-- Name: SEQUENCE country_seq; Type: ACL; Schema: public; Owner: postgres
--
