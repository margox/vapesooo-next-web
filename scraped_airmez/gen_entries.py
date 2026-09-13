# -*- coding: utf-8 -*-
"""Generate Airmez new product entries (8-language content/excerpt/seo) and merge into products.json."""
import json, hashlib, re, copy

BASE = "/Users/weijunjie/life/个人物料/公司/晴方/电子烟独立站/vapesooo/vapesooo-next-web"
PRODUCTS_PATH = BASE + "/src/data/products.json"

LOCALES = ["en", "es", "fr", "de", "it", "pt", "ru", "pl"]

# ---- language-neutral section heading translations ----
HEADINGS = {
    "en": {"feat": "Key Features", "spec": "Specifications", "flav": "Available Flavors", "intro": "Experience the {model}."},
    "es": {"feat": "Características principales", "spec": "Especificaciones", "flav": "Sabores disponibles", "intro": "Descubre el {model}."},
    "fr": {"feat": "Caractéristiques principales", "spec": "Spécifications", "flav": "Saveurs disponibles", "intro": "Découvrez le {model}."},
    "de": {"feat": "Hauptmerkmale", "spec": "Technische Daten", "flav": "Verfügbare Geschmacksrichtungen", "intro": "Entdecken Sie den {model}."},
    "it": {"feat": "Caratteristiche principali", "spec": "Specifiche", "flav": "Gusti disponibili", "intro": "Scopri il {model}."},
    "pt": {"feat": "Principais recursos", "spec": "Especificações", "flav": "Sabores disponíveis", "intro": "Descubra o {model}."},
    "ru": {"feat": "Основные характеристики", "spec": "Характеристики", "flav": "Доступные вкусы", "intro": "Откройте для себя {model}."},
    "pl": {"feat": "Najważniejsze cechy", "spec": "Specyfikacja", "flav": "Dostępne smaki", "intro": "Odkryj {model}."},
}

# ---- per-product data ----
# Each product: name, menuTitle, slugBase, original_excerpt, original_content, original_seo,
# images (list of {url, alt}), flavors (list, en names), specs (list of strings),
# features (list of strings), nic (str), short_desc (en one-liner for seo/excerpt base)
PRODUCTS = [
    {
        "key": "lux100k",
        "name": "AiRMEZ Lux 100K Puffs Disposable Vape – Visible Tank & Turbo Mode",
        "menuTitle": "Airmez Lux 100K Puffs",
        "slugBase": "airmez-lux-100k-puffs-visible-tank-turbo-mode",
        "original_excerpt": "AiRMEZ Lux 100K Puffs: 30ml crystal-clear visible tank, dual mesh coil with Turbo Boost mode, 650mAh Type-C fast charging and 10 premium flavors. 100,000 puffs of uncompromising performance.",
        "original_content": "The Airmez Lux 100K Puffs redefines the premium vaping experience through a revolutionary 30ml crystal-clear visible tank architecture, giving real-time visibility into your remaining juice levels. Driven by an advanced Dual Mesh Coil matrix, it supports both a balanced Single Mesh Mode and an intense Turbo Boost Mode. Fully stocked in the Poland fulfillment hub for fast, duty-free EU delivery.",
        "original_seo": {
            "description": "Airmez Lux 100K Puffs disposable vape features a 30ml visible tank, dual mesh coil, Turbo Boost mode, smart display and adjustable airflow for up to 100,000 puffs. Fast EU delivery.",
            "keywords": "Airmez, Lux 100K, disposable vape, 100000 puffs, visible tank, 30ml, turbo mode, dual mesh coil, 650mAh, Type-C, EU stock"
        },
        "images": [
            {"url": "https://vapesooo-1318551956.cos.accelerate.myqcloud.com/products/cbace7f6-f712-4b78-a17d-f68b104d0554",
             "alt": "Airmez Lux 100K Puffs Disposable Vape Visible Tank Turbo Mode"},
        ],
        "features": [
            "100,000 total puffs", "30ml crystal-clear visible oil tank",
            "Dual Mesh Coil with Single Mesh & Turbo Boost modes",
            "650mAh battery with Type-C fast charging (45–60 min full charge)",
            "Smart telemetry display (battery % & liquid level)",
            "Adjustable bottom airflow (MTL to DTL)",
        ],
        "specs": [
            "Puff Count: up to 100,000", "E-liquid: 30ml", "Battery: 650mAh, Type-C",
            "Coil: Dual Mesh Coil", "Nicotine: 0% / 2% / 3%",
        ],
        "flavors": ["Strawberry Ice", "Watermelon Ice", "Mixed Berries", "Passion Fruit Kiwi", "Dr Blue", "Love 66", "Triple Mango", "Cherry Cola", "Bingo Crush", "Pink Lemonade"],
        "short_desc": "Airmez Lux 100K delivers 100,000 puffs with a 30ml visible tank, dual mesh coil and Turbo Boost mode. Rechargeable, smart display and 10 premium flavors.",
    },
    {
        "key": "habibi120k",
        "name": "AiRMEZ HABIBI 120K Puffs Disposable Vape – Electronic Shisha",
        "menuTitle": "Airmez HABIBI 120K Puffs",
        "slugBase": "airmez-habibi-120k-puffs-electronic-shisha",
        "original_excerpt": "AiRMEZ HABIBI 120K: a portable electronic shisha with 40ml capacity, 0.4Ω mesh coil, 1000mAh battery, smart screen, adjustable airflow, LED effects and shisha sound. Up to 120,000 puffs.",
        "original_content": "The AiRMEZ HABIBI is a portable electronic shisha built for direct-to-lung vaping. It offers a 40ml capacity, a 1000mAh battery and a choice of 10 different flavors. The integrated smart screen allows usage monitoring at a glance, while adjustable airflow switches from a closed, flavor-rich draw to wide, soft vapor clouds. Perfect for hookah-style sessions anywhere, anytime.",
        "original_seo": {
            "description": "Airmez HABIBI 120K Puffs is a portable electronic shisha with 40ml capacity, 0.4Ω mesh coil, 1000mAh battery, smart screen and adjustable airflow for up to 120,000 puffs.",
            "keywords": "Airmez, HABIBI 120K, electronic shisha, disposable vape, 120000 puffs, 40ml, 0.4Ω mesh coil, 1000mAh, LED, hookah, DTL"
        },
        "images": [
            {"url": "https://vapesooo-1318551956.cos.accelerate.myqcloud.com/products/ba1cd244-7706-4547-bbfd-570a80e27731",
             "alt": "Airmez HABIBI 120K Puffs Electronic Shisha Disposable Vape"},
            {"url": "https://vapesooo-1318551956.cos.accelerate.myqcloud.com/products/820ba9e0-b9ba-4dda-ae6d-9e2dc8ef2c52",
             "alt": "Airmez HABIBI 120K Coco Loco flavor"},
        ],
        "features": [
            "Up to 120,000 puffs", "40ml e-liquid capacity",
            "0.4Ω mesh coil for dense vapor", "1000mAh battery with Type-C recharge",
            "Smart screen (battery & liquid level)", "Adjustable airflow (DTL)",
            "Immersive LED effects & shisha sound", "10 flavors",
        ],
        "specs": [
            "Puff Count: up to 120,000", "E-liquid: 40ml", "Battery: 1000mAh, Type-C",
            "Coil: 0.4Ω mesh", "Nicotine: 5% (50mg)",
        ],
        "flavors": ["Coco Loco", "and 9 more shisha-inspired flavors"],
        "short_desc": "Airmez HABIBI 120K is a portable electronic shisha delivering 120,000 puffs with a 40ml capacity, 0.4Ω mesh coil and 1000mAh battery. LED effects and shisha sound.",
    },
    {
        "key": "fox2in1pro",
        "name": "Airmez FOX 2IN1 PRO 80000 Puffs Disposable Vape",
        "menuTitle": "Airmez FOX 2IN1 PRO 80K Puffs",
        "slugBase": "airmez-fox-2in1-pro-80000-puffs",
        "original_excerpt": "Airmez FOX 2IN1 PRO 80000: a dual-payload modular platform with 30ml total (2×15ml isolated reservoirs), seamless 2-in-1 flavor switching, mesh coil and 650mAh Type-C charging. Up to 80,000 puffs.",
        "original_content": "The Airmez FOX 2IN1 PRO 80000 redefines high-capacity hardware by integrating two distinct flavor profiles into a single engineered chassis. Pre-loaded with a massive 30ml total e-liquid payload (two isolated 15ml reservoirs), it delivers an 80,000-puff lifecycle. The Zero-Cross-Contamination Architecture lets users mechanically toggle between two independent flavor chambers with zero flavor bleeding, supported by a 650mAh high-drain core and Type-C rapid recovery.",
        "original_seo": {
            "description": "Airmez FOX 2IN1 PRO 80000 Puffs disposable vape features two isolated 15ml reservoirs, sliding mouthpiece 2-in-1 switching, mesh coil and 650mAh Type-C battery for up to 80,000 puffs.",
            "keywords": "Airmez, FOX 2IN1 PRO, disposable vape, 80000 puffs, dual flavor, 30ml, mesh coil, 650mAh, Type-C, sliding mouthpiece"
        },
        "images": [
            {"url": "https://vapesooo-1318551956.cos.accelerate.myqcloud.com/products/b654d0ea-4e9d-4ffe-9626-34811c217e08",
             "alt": "Airmez FOX 2IN1 PRO 80000 Puffs Disposable Vape"},
            {"url": "https://vapesooo-1318551956.cos.accelerate.myqcloud.com/products/8bcb9a9c-e859-47d0-9cdf-c6040fa61520",
             "alt": "Airmez FOX 2IN1 PRO 80000 Puffs poster"},
        ],
        "features": [
            "Up to 80,000 puffs", "30ml total (2 × 15ml isolated reservoirs)",
            "Sliding mouthpiece 2-in-1 mechanical toggle",
            "Zero cross-contamination between chambers",
            "High-efficiency mesh coil", "650mAh battery with Type-C rapid charging",
            "10 new flavor editions",
        ],
        "specs": [
            "Puff Count: up to 80,000", "E-liquid: 30ml (15ml × 2)", "Battery: 650mAh, Type-C",
            "Coil: Mesh Coil", "Nicotine: 0% / 2% / 3% / 5%",
        ],
        "flavors": ["10 new flavor editions (dual flavor combos)"],
        "short_desc": "Airmez FOX 2IN1 PRO 80000 offers 80,000 puffs with two isolated 15ml reservoirs and sliding mouthpiece switching. Mesh coil and 650mAh Type-C battery.",
    },
    {
        "key": "exclusive12in1",
        "name": "AiRMEZ Exclusive 12-in-1 300K Puffs Disposable Vape",
        "menuTitle": "Airmez Exclusive 12-in-1 300K Puffs",
        "slugBase": "airmez-exclusive-12-in-1-300k-puffs",
        "original_excerpt": "AiRMEZ Exclusive 12-in-1 300K: industry-first 12-flavor mechanical rotation dial, 6 pure + 6 combination flavor modes, advanced mesh coil and Type-C charging. Historic 300,000 puffs capacity.",
        "original_content": "The AiRMEZ Exclusive 12-in-1 300K is the 2026 benchmark of high-capacity hardware, combining an industry-first 12-flavor mechanical rotation system with a historic 300,000 puffs total capacity. The patented 12-in-1 adjustable dial mechanism switches between 12 entirely independent internal liquid chambers, ensuring zero cross-contamination. Divided into Pure Flavors Mode (6 base selections) and Flavors Combination Mode (6 premium blends), it delivers crisp, distinct flavors from first draw to last.",
        "original_seo": {
            "description": "Airmez Exclusive 12-in-1 300K Puffs features a 12-flavor mechanical dial, 6 pure and 6 combination modes, advanced mesh coil and Type-C charging with up to 300,000 puffs.",
            "keywords": "Airmez, Exclusive 12-in-1, 300K, disposable vape, 300000 puffs, 12 flavors, dial, 90ml, mesh coil, Type-C, multi-flavor"
        },
        "images": [
            {"url": "https://vapesooo-1318551956.cos.accelerate.myqcloud.com/products/d00c1357-c577-4a37-9c0f-56779c9a01e8",
             "alt": "Airmez Exclusive 12-in-1 300K Puffs Disposable Vape"},
        ],
        "features": [
            "Historic 300,000 puffs total capacity (30,000 per chamber)",
            "Industry-first 12-in-1 adjustable mouthpiece dial",
            "6 Pure Flavors Mode + 6 Flavors Combination Mode",
            "12 isolated liquid chambers – zero cross-contamination",
            "Advanced mesh coil structure", "Type-C fast charging",
            "Premium telemetry digital screen", "10 curated multi-flavor editions",
        ],
        "specs": [
            "Puff Count: up to 300,000", "E-liquid: 90ml (6 × 15ml)", "Battery: Type-C, 650mAh",
            "Coil: Advanced Mesh Coil", "Nicotine: 2% / 5%",
        ],
        "flavors": ["Edition 1–10 (12 flavors incl. Watermelon Ice, Dr Blue, Love66, Triple Mango, Cola Ice, Pink Lemonade...)"],
        "short_desc": "Airmez Exclusive 12-in-1 300K delivers 300,000 puffs with a 12-flavor mechanical dial, 6 pure and 6 blend modes, and 90ml capacity. Type-C charging.",
    },
]

# ---- translation dictionaries (excerpt/seo description per language) ----
# Provided per product below as map: lang -> (excerpt, seo_desc)
TRANSLATIONS = {
    "lux100k": {
        "en": ("Airmez Lux 100K delivers 100,000 puffs with a 30ml visible tank, dual mesh coil and Turbo Boost mode. Rechargeable, smart display and 10 premium flavors.",
               "Airmez Lux 100K Puffs disposable vape offers 100,000 puffs with a 30ml crystal-clear visible tank, dual mesh coil and Turbo Boost mode. 650mAh Type-C battery, smart display, adjustable airflow and 10 premium flavors for a premium EU experience."),
        "es": ("Airmez Lux 100K ofrece 100.000 caladas con tanque visible de 30 ml, doble malla y modo Turbo. Recargable, pantalla inteligente y 10 sabores premium.",
               "El vape desechable Airmez Lux 100K Puffs ofrece 100.000 caladas con tanque visible de 30 ml, bobina de doble malla y modo Turbo Boost. Batería de 650mAh con carga Type-C, pantalla inteligente, flujo de aire ajustable y 10 sabores premium."),
        "fr": ("Airmez Lux 100K offre 100 000 bouffées avec réservoir visible de 30 ml, double mesh et mode Turbo. Rechargeable, écran intelligent et 10 saveurs premium.",
               "La cigarette électronique jetable Airmez Lux 100K Puffs offre 100 000 bouffées avec réservoir visible de 30 ml, bobine double mesh et mode Turbo Boost. Batterie 650mAh, charge Type-C, écran intelligent, flux d'air réglable et 10 saveurs premium."),
        "de": ("Airmez Lux 100K bietet 100.000 Züge mit sichtbarem 30-ml-Tank, Dual-Mesh-Coil und Turbo-Modus. Wiederaufladbar, Smart-Display und 10 Premium-Aromen.",
               "Die Airmez Lux 100K Puffs Einweg-Vape bietet 100.000 Züge mit sichtbarem 30-ml-Tank, Dual-Mesh-Coil und Turbo-Boost-Modus. 650mAh-Akku, Typ-C-Laden, Smart-Display, einstellbarer Luftstrom und 10 Premium-Aromen."),
        "it": ("Airmez Lux 100K offre 100.000 svapate con serbatoio visibile da 30 ml, doppia mesh e modalità Turbo. Ricaricabile, display smart e 10 gusti premium.",
               "La sigaretta elettronica usa e getta Airmez Lux 100K Puffs offre 100.000 svapate con serbatoio visibile da 30 ml, doppia bobina mesh e modalità Turbo Boost. Batteria 650mAh, ricarica Type-C, display smart, flusso d'aria regolabile e 10 gusti premium."),
        "pt": ("Airmez Lux 100K oferece 100.000 baforadas com tanque visível de 30 ml, mesh dupla e modo Turbo. Recarregável, tela inteligente e 10 sabores premium.",
               "O vape descartável Airmez Lux 100K Puffs oferece 100.000 baforadas com tanque visível de 30 ml, bobina mesh dupla e modo Turbo Boost. Bateria de 650mAh, carga Type-C, tela inteligente, fluxo de ar ajustável e 10 sabores premium."),
        "ru": ("Airmez Lux 100K обеспечивает 100 000 затяжек с прозрачным баком на 30 мл, двойной сеткой и режимом Turbo. Перезаряжаемый, умный дисплей и 10 премиальных вкусов.",
               "Одноразовый вейп Airmez Lux 100K Puffs обеспечивает 100 000 затяжек с прозрачным баком на 30 мл, двойной сетчатой катушкой и режимом Turbo Boost. Аккумулятор 650 мАч, зарядка Type-C, умный дисплей, регулируемый воздушный поток и 10 премиальных вкусов."),
        "pl": ("Airmez Lux 100K zapewnia 100 000 zaciągnięć z widocznym zbiornikiem 30 ml, podwójną siatką i trybem Turbo. Ładowany, inteligentny wyświetlacz i 10 premium smaków.",
               "Jednorazowy waporyzator Airmez Lux 100K Puffs zapewnia 100 000 zaciągnięć z widocznym zbiornikiem 30 ml, podwójną cewką mesh i trybem Turbo Boost. Bateria 650 mAh, ładowanie Type-C, inteligentny wyświetlacz, regulowany przepływ powietrza i 10 premium smaków."),
    },
    "habibi120k": {
        "en": ("Airmez HABIBI 120K is a portable electronic shisha delivering 120,000 puffs with a 40ml capacity, 0.4Ω mesh coil and 1000mAh battery. LED effects and shisha sound.",
               "Airmez HABIBI 120K Puffs is a portable electronic shisha with 40ml capacity, 0.4Ω mesh coil, 1000mAh battery and smart screen. Adjustable airflow, LED effects and shisha sound for up to 120,000 puffs of hookah-style vaping."),
        "es": ("Airmez HABIBI 120K es una shisha electrónica portátil con 120.000 caladas, 40 ml, bobina de malla 0,4 Ω y batería de 1000mAh. Efectos LED y sonido de shisha.",
               "La shisha electrónica Airmez HABIBI 120K Puffs ofrece 40 ml de capacidad, bobina de malla 0,4 Ω, batería de 1000mAh y pantalla inteligente. Flujo de aire ajustable, efectos LED y sonido de shisha para hasta 120.000 caladas."),
        "fr": ("Airmez HABIBI 120K est une chicha électronique portable offrant 120 000 bouffées, 40 ml, bobine mesh 0,4 Ω et batterie 1000mAh. Effets LED et son de chicha.",
               "La chicha électronique Airmez HABIBI 120K Puffs offre 40 ml, bobine mesh 0,4 Ω, batterie 1000mAh et écran intelligent. Flux d'air réglable, effets LED et son de chicha pour jusqu'à 120 000 bouffées."),
        "de": ("Airmez HABIBI 120K ist eine tragbare elektronische Shisha mit 120.000 Zügen, 40 ml, 0,4-Ω-Mesh-Coil und 1000mAh-Akku. LED-Effekte und Shisha-Sound.",
               "Die tragbare elektronische Shisha Airmez HABIBI 120K Puffs bietet 40 ml, 0,4-Ω-Mesh-Coil, 1000mAh-Akku und Smart-Display. Einstellbarer Luftstrom, LED-Effekte und Shisha-Sound für bis zu 120.000 Züge."),
        "it": ("Airmez HABIBI 120K è una shisha elettronica portatile con 120.000 svapate, 40 ml, bobina mesh 0,4 Ω e batteria da 1000mAh. Effetti LED e suono shisha.",
               "La shisha elettronica portatile Airmez HABIBI 120K Puffs offre 40 ml, bobina mesh 0,4 Ω, batteria 1000mAh e display smart. Flusso d'aria regolabile, effetti LED e suono shisha per fino a 120.000 svapate."),
        "pt": ("Airmez HABIBI 120K é uma shisha eletrônica portátil com 120.000 baforadas, 40 ml, bobina mesh 0,4 Ω e bateria de 1000mAh. Efeitos LED e som de shisha.",
               "A shisha eletrônica portátil Airmez HABIBI 120K Puffs oferece 40 ml, bobina mesh 0,4 Ω, bateria 1000mAh e tela inteligente. Fluxo de ar ajustável, efeitos LED e som de shisha para até 120.000 baforadas."),
        "ru": ("Airmez HABIBI 120K — портативная электронная шиша с 120 000 затяжек, 40 мл, сеткой 0,4 Ом и батареей 1000 мАч. LED-эффекты и звук кальяна.",
               "Портативная электронная шиша Airmez HABIBI 120K Puffs предлагает 40 мл, сетчатую катушку 0,4 Ом, батарею 1000 мАч и умный дисплей. Регулируемый воздушный поток, LED-эффекты и звук кальяна до 120 000 затяжек."),
        "pl": ("Airmez HABIBI 120K to przenośna elektroniczna szisza z 120 000 zaciągnięć, 40 ml, cewką mesh 0,4 Ω i baterią 1000 mAh. Efekty LED i dźwięk sziszy.",
               "Przenośna elektroniczna szisza Airmez HABIBI 120K Puffs oferuje 40 ml, cewkę mesh 0,4 Ω, baterię 1000 mAh i inteligentny wyświetlacz. Regulowany przepływ powietrza, efekty LED i dźwięk sziszy do 120 000 zaciągnięć."),
    },
    "fox2in1pro": {
        "en": ("Airmez FOX 2IN1 PRO 80000 offers 80,000 puffs with two isolated 15ml reservoirs and sliding mouthpiece switching. Mesh coil and 650mAh Type-C battery.",
               "Airmez FOX 2IN1 PRO 80000 Puffs disposable vape features two isolated 15ml reservoirs (30ml total), sliding mouthpiece 2-in-1 switching, high-efficiency mesh coil and 650mAh Type-C battery for up to 80,000 puffs with zero flavor bleeding."),
        "es": ("Airmez FOX 2IN1 PRO 80000 ofrece 80.000 caladas con dos depósitos aislados de 15 ml y conmutación por boquilla deslizante. Bobina de malla y batería de 650mAh.",
               "El vape desechable Airmez FOX 2IN1 PRO 80000 Puffs cuenta con dos depósitos aislados de 15 ml (30 ml en total), conmutación 2 en 1 por boquilla deslizante, bobina de malla de alta eficiencia y batería de 650mAh con carga Type-C para hasta 80.000 caladas."),
        "fr": ("Airmez FOX 2IN1 PRO 80000 offre 80 000 bouffées avec deux réservoirs isolés de 15 ml et commutation par embout coulissant. Bobine mesh et batterie 650mAh.",
               "La cigarette jetable Airmez FOX 2IN1 PRO 80000 Puffs dispose de deux réservoirs isolés de 15 ml (30 ml au total), d'une commutation 2-en-1 par embout coulissant, d'une bobine mesh haute efficacité et d'une batterie 650mAh à charge Type-C pour jusqu'à 80 000 bouffées."),
        "de": ("Airmez FOX 2IN1 PRO 80000 bietet 80.000 Züge mit zwei isolierten 15-ml-Reservoirs und Schiebemundstück-Umschaltung. Mesh-Coil und 650mAh-Akku.",
               "Die Einweg-Vape Airmez FOX 2IN1 PRO 80000 Puffs bietet zwei isolierte 15-ml-Reservoirs (30 ml gesamt), 2-in-1-Umschaltung per Schiebemundstück, hocheffiziente Mesh-Coil und 650mAh-Akku mit Typ-C-Laden für bis zu 80.000 Züge."),
        "it": ("Airmez FOX 2IN1 PRO 80000 offre 80.000 svapate con due serbatoi isolati da 15 ml e commutazione tramite bocchino scorrevole. Bobina mesh e batteria 650mAh.",
               "La sigaretta usa e getta Airmez FOX 2IN1 PRO 80000 Puffs offre due serbatoi isolati da 15 ml (30 ml totali), commutazione 2-in-1 tramite bocchino scorrevole, bobina mesh ad alta efficienza e batteria 650mAh con ricarica Type-C per fino a 80.000 svapate."),
        "pt": ("Airmez FOX 2IN1 PRO 80000 oferece 80.000 baforadas com dois reservatórios isolados de 15 ml e comutação por bocal deslizante. Bobina mesh e bateria de 650mAh.",
               "O vape descartável Airmez FOX 2IN1 PRO 80000 Puffs possui dois reservatórios isolados de 15 ml (30 ml no total), comutação 2 em 1 por bocal deslizante, bobina mesh de alta eficiência e bateria de 650mAh com carga Type-C para até 80.000 baforadas."),
        "ru": ("Airmez FOX 2IN1 PRO 80000 обеспечивает 80 000 затяжек с двумя изолированными резервуарами по 15 мл и переключением скользящим мундштуком. Сетка и батарея 650 мАч.",
               "Одноразовый вейп Airmez FOX 2IN1 PRO 80000 Puffs имеет два изолированных резервуара по 15 мл (30 мл всего), переключение 2-в-1 скользящим мундштуком, высокоэффективную сетчатую катушку и батарею 650 мАч с зарядкой Type-C до 80 000 затяжек."),
        "pl": ("Airmez FOX 2IN1 PRO 80000 zapewnia 80 000 zaciągnięć z dwoma izolowanymi zbiornikami po 15 ml i przełączaniem przesuwnym ustnikiem. Cewka mesh i bateria 650 mAh.",
               "Jednorazowy waporyzator Airmez FOX 2IN1 PRO 80000 Puffs ma dwa izolowane zbiorniki po 15 ml (30 ml łącznie), przełączanie 2-w-1 przesuwnym ustnikiem, wysokowydajną cewkę mesh i baterię 650 mAh z ładowaniem Type-C do 80 000 zaciągnięć."),
    },
    "exclusive12in1": {
        "en": ("Airmez Exclusive 12-in-1 300K delivers 300,000 puffs with a 12-flavor mechanical dial, 6 pure and 6 blend modes, and 90ml capacity. Type-C charging.",
               "Airmez Exclusive 12-in-1 300K Puffs features an industry-first 12-flavor mechanical dial with 6 Pure Flavors and 6 Combination Modes, 12 isolated chambers, advanced mesh coil and Type-C charging for up to 300,000 puffs of pure, distinct flavor."),
        "es": ("Airmez Exclusive 12-en-1 300K ofrece 300.000 caladas con dial mecánico de 12 sabores, 6 modos puros y 6 combinados, y 90 ml. Carga Type-C.",
               "El vape desechable Airmez Exclusive 12-en-1 300K Puffs cuenta con un dial mecánico de 12 sabores, 6 modos de sabores puros y 6 de combinación, 12 cámaras aisladas, bobina de malla avanzada y carga Type-C para hasta 300.000 caladas."),
        "fr": ("Airmez Exclusive 12-en-1 300K offre 300 000 bouffées avec molette mécanique à 12 saveurs, 6 modes purs et 6 combinés, et 90 ml. Charge Type-C.",
               "La cigarette jetable Airmez Exclusive 12-en-1 300K Puffs dispose d'une molette mécanique à 12 saveurs, 6 modes de saveurs pures et 6 de combinaison, 12 chambres isolées, bobine mesh avancée et charge Type-C pour jusqu'à 300 000 bouffées."),
        "de": ("Airmez Exclusive 12-in-1 300K bietet 300.000 Züge mit mechanischem 12-Aromen-Wahlrad, 6 reinen und 6 kombinierten Modi und 90 ml. Typ-C-Laden.",
               "Die Einweg-Vape Airmez Exclusive 12-in-1 300K Puffs verfügt über ein mechanisches 12-Aromen-Wahlrad, 6 reine und 6 kombinierte Aromenmodi, 12 isolierte Kammern, fortschrittliche Mesh-Coil und Typ-C-Laden für bis zu 300.000 Züge."),
        "it": ("Airmez Exclusive 12-in-1 300K offre 300.000 svapate con quadrante meccanico a 12 gusti, 6 modi puri e 6 combinati, e 90 ml. Ricarica Type-C.",
               "La sigaretta usa e getta Airmez Exclusive 12-in-1 300K Puffs offre un quadrante meccanico a 12 gusti, 6 modi di gusti puri e 6 di combinazione, 12 camere isolate, bobina mesh avanzata e ricarica Type-C per fino a 300.000 svapate."),
        "pt": ("Airmez Exclusive 12-em-1 300K oferece 300.000 baforadas com mostrador mecânico de 12 sabores, 6 modos puros e 6 combinados, e 90 ml. Carga Type-C.",
               "O vape descartável Airmez Exclusive 12-em-1 300K Puffs possui um mostrador mecânico de 12 sabores, 6 modos de sabores puros e 6 de combinação, 12 câmaras isoladas, bobina mesh avançada e carga Type-C para até 300.000 baforadas."),
        "ru": ("Airmez Exclusive 12-в-1 300K обеспечивает 300 000 затяжек с механическим диском на 12 вкусов, 6 чистыми и 6 комбинированными режимами, объёмом 90 мл. Зарядка Type-C.",
               "Одноразовый вейп Airmez Exclusive 12-в-1 300K Puffs имеет механический диск на 12 вкусов, 6 режимов чистых вкусов и 6 комбинированных, 12 изолированных камер, продвинутую сетчатую катушку и зарядку Type-C до 300 000 затяжек."),
        "pl": ("Airmez Exclusive 12-w-1 300K zapewnia 300 000 zaciągnięć z mechanicznym pokrętłem na 12 smaków, 6 trybami czystymi i 6 kombinowanymi oraz pojemnością 90 ml. Ładowanie Type-C.",
               "Jednorazowy waporyzator Airmez Exclusive 12-w-1 300K Puffs ma mechaniczne pokrętło na 12 smaków, 6 trybów czystych smaków i 6 kombinowanych, 12 izolowanych komór, zaawansowaną cewkę mesh i ładowanie Type-C do 300 000 zaciągnięć."),
    },
}


def build_content(p, lang):
    h = HEADINGS[lang]
    intro = f"<p class='mb-4'>{h['intro'].format(model=p['name'])}</p>"
    feat = "".join(f"<li>{f}</li>" for f in p["features"])
    spec = "".join(f"<li>{s}</li>" for s in p["specs"])
    flav = "".join(f"<li>{f}</li>" for f in p["flavors"])
    return (
        f"<div class='text-gray-800 font-sans'>\n{intro}\n"
        f"<p class='mb-4 font-semibold'>{h['feat']}:</p>\n<ul class='mb-4 list-disc pl-5'>{feat}</ul>\n"
        f"<p class='mb-4 font-semibold'>{h['spec']}:</p>\n<ul class='mb-4 list-disc pl-5'>{spec}</ul>\n"
        f"<p class='mb-4 font-semibold'>{h['flav']}:</p>\n<ul class='mb-4 list-disc pl-5'>{flav}</ul>\n"
        f"<p class='mb-4'>Airmez / Vapesooo.</p>\n</div>"
    )


def build_entry(p):
    tr = TRANSLATIONS[p["key"]]
    slug = p["slugBase"]
    content = {lang: build_content(p, lang) for lang in LOCALES}
    excerpt = {lang: tr[lang][0] for lang in LOCALES}
    seo = {lang: {"description": tr[lang][1], "keywords": p["original_seo"]["keywords"]} for lang in LOCALES}
    return {
        "name": p["name"],
        "menuTitle": p["menuTitle"],
        "slug": slug,
        "original_excerpt": p["original_excerpt"],
        "original_content": p["original_content"],
        "images": p["images"],
        "original_seo": p["original_seo"],
        "content": content,
        "excerpt": excerpt,
        "seo": seo,
    }


def main():
    with open(PRODUCTS_PATH, encoding="utf-8") as f:
        data = json.load(f)

    airmez = data["Airmez"]
    existing_slugs = {pr["slug"] for pr in airmez["products"]}
    added = []
    for p in PRODUCTS:
        entry = build_entry(p)
        if entry["slug"] in existing_slugs:
            print("SKIP existing:", entry["slug"])
            continue
        airmez["products"].append(entry)
        added.append(entry["slug"])
        print("ADDED:", entry["slug"])

    # keep deterministic order? Airmez uses sort field at brand level; append at end is fine
    with open(PRODUCTS_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("total added:", len(added))
    print("Airmez product count now:", len(airmez["products"]))


if __name__ == "__main__":
    main()
