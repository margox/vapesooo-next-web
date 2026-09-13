# -*- coding: utf-8 -*-
"""Generate Stagbar brand entry (5 products, 8-language content/excerpt/seo) and merge into products.json."""
import json

BASE = "/Users/weijunjie/life/个人物料/公司/晴方/电子烟独立站/vapesooo/vapesooo-next-web"
PRODUCTS_PATH = BASE + "/src/data/products.json"
LOCALES = ["en", "es", "fr", "de", "it", "pt", "ru", "pl"]

HEADINGS = {
    "en": {"feat": "Key Features", "spec": "Specifications", "flav": "Available Flavors"},
    "es": {"feat": "Características principales", "spec": "Especificaciones", "flav": "Sabores disponibles"},
    "fr": {"feat": "Caractéristiques principales", "spec": "Spécifications", "flav": "Saveurs disponibles"},
    "de": {"feat": "Hauptmerkmale", "spec": "Technische Daten", "flav": "Verfügbare Geschmacksrichtungen"},
    "it": {"feat": "Caratteristiche principali", "spec": "Specifiche", "flav": "Gusti disponibili"},
    "pt": {"feat": "Principais recursos", "spec": "Especificações", "flav": "Sabores disponíveis"},
    "ru": {"feat": "Основные характеристики", "spec": "Характеристики", "flav": "Доступные вкусы"},
    "pl": {"feat": "Najważniejsze cechy", "spec": "Specyfikacja", "flav": "Dostępne smaki"},
}

C = "https://vapesooo-1318551956.cos.accelerate.myqcloud.com/products/"

PRODUCTS = [
    {
        "key": "4in1",
        "title": "Stagbar 4in1 80K", "menuTitle": "Stagbar 4in1 80K Puffs",
        "name": "Stagbar 4in1 80,000 Puffs Disposable Vape",
        "slug": "stagbar-4in1-80k-puffs", "puffs": 80000,
        "img": "0efbf314-49e0-4d2b-8bab-87f9c0bc2c35",
        "intro": "The Stagbar 4-in-1 80,000 is a revolutionary high-capacity disposable featuring 4 flavors and 4 independent mesh coils in one device, delivering an industry-leading 80,000 puffs.",
        "features": ["4 flavors in 1 device", "4 independent mesh coils", "Seamless flavor switching with high-output performance", "1000mAh battery with Type-C charging"],
        "specs": ["Puff Count: up to 80,000", "E-liquid: 4 x 18ml", "Battery: 1000mAh, Type-C", "Coil: 1.0 Ohm mesh coil", "Nicotine: 2% / 5%"],
        "flavors": ["15 flavor editions (Blueberry, Watermelon, Strawberry, Cherry, Fruit, Mixed Fruit, Summer, Juicy, Blue, Exotic, Lime, Cherry Pineapple, Beach, Candy, Tropical) - 4 flavors each"],
    },
    {
        "key": "6in1",
        "title": "Stagbar 6in1 180K", "menuTitle": "Stagbar 6in1 180K Puffs",
        "name": "Stagbar 6in1 180,000 Puffs Disposable Vape",
        "slug": "stagbar-6in1-180k-puffs", "puffs": 180000,
        "img": "f0dc717a-566c-4148-aac5-4fe33f8af4af",
        "intro": "The Stagbar 6-in-1 features a unique 6-flavor system and six independent mesh coils, letting users switch between six distinct tastes in one device for the ultimate all-week vape.",
        "features": ["6 flavors in 1 device", "6 independent mesh coils", "Switch between six distinct tastes", "1000mAh battery with Type-C charging", "Extreme puff counts"],
        "specs": ["Puff Count: up to 180,000", "E-liquid: 6 x 18ml", "Battery: 1000mAh, Type-C", "Coil: 1.1 Ohm mesh coil", "Nicotine: 2% / 5%"],
        "flavors": ["Multiple flavor editions (Fruit, Watermelon, Strawberry and more) - 6 flavors each"],
    },
    {
        "key": "jagger",
        "title": "Stagbar Jagger Pro 40K", "menuTitle": "Stagbar Jagger Pro 40K Puffs",
        "name": "Stagbar Jagger Pro 40,000 Puffs Disposable Vape",
        "slug": "stagbar-jagger-pro-40k-puffs", "puffs": 40000,
        "img": "0474562d-eb2d-4a5b-9b44-4f440e3d7fba",
        "intro": "The Stagbar Jagger Pro is a high-performance, rechargeable disposable designed for precision and power, delivering 40,000 puffs of pure flavor with pro-level control.",
        "features": ["High-performance rechargeable disposable", "Precision and power", "40,000 puffs of pure flavor", "750mAh battery with Type-C charging"],
        "specs": ["Puff Count: up to 40,000", "E-liquid: 22ml", "Battery: 750mAh, Type-C", "Coil: 1.0 Ohm mesh coil", "Nicotine: 2% / 5%"],
        "flavors": ["Coco Loco, Sex on the Beach, Lemon Lime, Red Bull, Watermelon Ice, Mixed Berries, Strawberry Kiwi, Banana Ice, Blueberry Raspberry, Strawberry Grape, Blue Raspberry Lemonade, White Mamba, Strawberry Banana, Grape Ice, Strawberry Watermelon, Black Dragon Ice, Cola Ice, Triple Melon, Cherry Cranberry, Gummy Candy"],
    },
    {
        "key": "nexus",
        "title": "Stagbar Nexus 60K", "menuTitle": "Stagbar Nexus 60K Puffs",
        "name": "Stagbar Nexus 60,000 Puffs Disposable Vape",
        "slug": "stagbar-nexus-60k-puffs", "puffs": 60000,
        "img": "00a6e73e-e3e0-4063-a568-9f061fda3c86",
        "intro": "The Stagbar Nexus 60,000 is a premium, high-capacity disposable vape built for endurance and flavor depth, combining high-capacity performance with customizable airflow.",
        "features": ["Premium high-capacity disposable", "Customizable airflow", "Built for endurance and flavor depth", "850mAh battery with Type-C charging"],
        "specs": ["Puff Count: up to 60,000", "E-liquid: 30ml", "Battery: 850mAh, Type-C", "Coil: 0.9 Ohm mesh coil", "Nicotine: 2% / 5%"],
        "flavors": ["Watermelon Ice, Blueberry Raspberry Ice, Mixed Berries, Strawberry Grape, Strawberry Kiwi, Love 66, Raspberry Watermelon, Lemon Lime, Peach Mango, Red Bull"],
    },
    {
        "key": "storm",
        "title": "Stag Bar Storm 50K", "menuTitle": "Stag Bar Storm 50K Puffs",
        "name": "Stag Bar Storm 50,000 Puffs Disposable Vape",
        "slug": "stagbar-storm-50k-puffs", "puffs": 50000,
        "img": "808e3315-4ae8-45e3-aaeb-6cb9cc51ae3e",
        "intro": "Stag Bar Storm 50K is effortless to use straight out of the box, delivering consistently rich flavor and smooth vapor from the first puff to the last.",
        "features": ["Effortless out-of-the-box use", "Consistently rich flavor", "Smooth vapor from first puff to last", "850mAh battery with Type-C charging"],
        "specs": ["Puff Count: up to 50,000", "E-liquid: 20ml", "Battery: 850mAh, Type-C", "Coil: 1.0 Ohm mesh coil", "Nicotine: 2% / 5%"],
        "flavors": ["Black Dragon Ice, Blackberry Pear, Blue Razz Ice, Blueberry Sour Raspberry, Cherry Ice, Lemon Lime, Peach Ice, Strawberry Watermelon, Triple Mango, Watermelon Ice"],
    },
]

# (excerpt, seo_description) per language per product
TR = {
 "4in1": {
  "en": ("Stagbar 4in1 80K disposable vape combines 4 flavors and 4 independent mesh coils in one device for up to 80,000 puffs, 1000mAh battery and seamless flavor switching.",
         "Stagbar 4in1 80,000 Puffs disposable vape features 4 flavors and 4 independent mesh coils in one device, 1000mAh battery with Type-C charging and seamless flavor switching for up to 80,000 puffs. 15 flavor editions available."),
  "es": ("El vape desechable Stagbar 4in1 80K combina 4 sabores y 4 bobinas de malla independientes para hasta 80.000 caladas, batería de 1000mAh y cambio de sabor sin interrupciones.",
         "El vape desechable Stagbar 4in1 80.000 Puffs incluye 4 sabores y 4 bobinas de malla independientes, batería de 1000mAh con carga Type-C y cambio de sabor sin interrupciones para hasta 80.000 caladas. 15 ediciones de sabor disponibles."),
  "fr": ("La vape jetable Stagbar 4in1 80K combine 4 saveurs et 4 résistances mesh indépendantes pour jusqu'à 80 000 bouffées, batterie 1000mAh et changement de saveur fluide.",
         "La vape jetable Stagbar 4in1 80 000 Puffs offre 4 saveurs et 4 résistances mesh indépendantes, batterie 1000mAh avec charge Type-C et changement de saveur fluide pour jusqu'à 80 000 bouffées. 15 éditions de saveurs."),
  "de": ("Die Stagbar 4in1 80K Einweg-Vape kombiniert 4 Aromen und 4 unabhängige Mesh-Coils für bis zu 80.000 Züge, 1000mAh-Akku und nahtlosen Aromenwechsel.",
         "Die Stagbar 4in1 80.000 Puffs Einweg-Vape bietet 4 Aromen und 4 unabhängige Mesh-Coils, 1000mAh-Akku mit Typ-C-Laden und nahtlosen Aromenwechsel für bis zu 80.000 Züge. 15 Aromen-Editionen verfügbar."),
  "it": ("La svapo usa e getta Stagbar 4in1 80K combina 4 gusti e 4 bobine mesh indipendenti per fino a 80.000 svapate, batteria da 1000mAh e cambio gusto senza interruzioni.",
         "La sigaretta usa e getta Stagbar 4in1 80.000 Puffs offre 4 gusti e 4 bobine mesh indipendenti, batteria 1000mAh con ricarica Type-C e cambio gusto fluido per fino a 80.000 svapate. 15 edizioni di gusto."),
  "pt": ("O vape descartável Stagbar 4in1 80K combina 4 sabores e 4 bobinas mesh independentes para até 80.000 baforadas, bateria de 1000mAh e troca de sabor sem interrupções.",
         "O vape descartável Stagbar 4in1 80.000 Puffs oferece 4 sabores e 4 bobinas mesh independentes, bateria de 1000mAh com carga Type-C e troca de sabor fluida para até 80.000 baforadas. 15 edições de sabor disponíveis."),
  "ru": ("Одноразовый вейп Stagbar 4in1 80K сочетает 4 вкуса и 4 независимые сетчатые катушки до 80 000 затяжек, батарею 1000 мАч и плавное переключение вкусов.",
         "Одноразовый вейп Stagbar 4in1 80 000 Puffs предлагает 4 вкуса и 4 независимые сетчатые катушки, батарею 1000 мАч с зарядкой Type-C и плавное переключение вкусов до 80 000 затяжек. Доступно 15 вкусовых изданий."),
  "pl": ("Jednorazowy waporyzator Stagbar 4in1 80K łączy 4 smaki i 4 niezależne cewki mesh do 80 000 zaciągnięć, baterię 1000 mAh i płynną zmianę smaku.",
         "Jednorazowy waporyzator Stagbar 4in1 80 000 Puffs oferuje 4 smaki i 4 niezależne cewki mesh, baterię 1000 mAh z ładowaniem Type-C i płynną zmianę smaku do 80 000 zaciągnięć. Dostępnych 15 edycji smakowych."),
 },
 "6in1": {
  "en": ("Stagbar 6in1 180K disposable vape features a unique 6-flavor system and six independent mesh coils for up to 180,000 puffs, 1000mAh battery and smooth taste switching.",
         "Stagbar 6in1 180,000 Puffs disposable vape delivers a unique 6-flavor system with six independent mesh coils, 1000mAh battery with Type-C charging and smooth switching between six tastes for up to 180,000 puffs."),
  "es": ("El vape desechable Stagbar 6in1 180K ofrece un sistema único de 6 sabores y seis bobinas de malla independientes para hasta 180.000 caladas, batería de 1000mAh y cambio suave de sabor.",
         "El vape desechable Stagbar 6in1 180.000 Puffs ofrece un sistema único de 6 sabores con seis bobinas de malla independientes, batería de 1000mAh con carga Type-C y cambio suave entre seis sabores para hasta 180.000 caladas."),
  "fr": ("La vape jetable Stagbar 6in1 180K offre un système unique à 6 saveurs et six résistances mesh indépendantes pour jusqu'à 180 000 bouffées, batterie 1000mAh et changement de saveur fluide.",
         "La vape jetable Stagbar 6in1 180 000 Puffs offre un système unique à 6 saveurs avec six résistances mesh indépendantes, batterie 1000mAh avec charge Type-C et changement fluide entre six saveurs pour jusqu'à 180 000 bouffées."),
  "de": ("Die Stagbar 6in1 180K Einweg-Vape bietet ein einzigartiges 6-Aromen-System mit sechs unabhängigen Mesh-Coils für bis zu 180.000 Züge, 1000mAh-Akku und sanften Aromenwechsel.",
         "Die Stagbar 6in1 180.000 Puffs Einweg-Vape bietet ein einzigartiges 6-Aromen-System mit sechs unabhängigen Mesh-Coils, 1000mAh-Akku mit Typ-C-Laden und sanftem Wechsel zwischen sechs Aromen für bis zu 180.000 Züge."),
  "it": ("La svapo usa e getta Stagbar 6in1 180K offre un sistema unico a 6 gusti con sei bobine mesh indipendenti per fino a 180.000 svapate, batteria da 1000mAh e cambio gusto fluido.",
         "La sigaretta usa e getta Stagbar 6in1 180.000 Puffs offre un sistema unico a 6 gusti con sei bobine mesh indipendenti, batteria 1000mAh con ricarica Type-C e cambio fluido tra sei gusti per fino a 180.000 svapate."),
  "pt": ("O vape descartável Stagbar 6in1 180K oferece um sistema único de 6 sabores com seis bobinas mesh independentes para até 180.000 baforadas, bateria de 1000mAh e troca suave de sabor.",
         "O vape descartável Stagbar 6in1 180.000 Puffs oferece um sistema único de 6 sabores com seis bobinas mesh independentes, bateria de 1000mAh com carga Type-C e troca suave entre seis sabores para até 180.000 baforadas."),
  "ru": ("Одноразовый вейп Stagbar 6in1 180K предлагает уникальную систему из 6 вкусов с шестью независимыми сетчатыми катушками до 180 000 затяжек, батарею 1000 мАч и плавное переключение.",
         "Одноразовый вейп Stagbar 6in1 180 000 Puffs предлагает уникальную систему из 6 вкусов с шестью независимыми сетчатыми катушками, батарею 1000 мАч с зарядкой Type-C и плавное переключение между шестью вкусами до 180 000 затяжек."),
  "pl": ("Jednorazowy waporyzator Stagbar 6in1 180K oferuje unikalny system 6 smaków z sześcioma niezależnymi cewkami mesh do 180 000 zaciągnięć, baterię 1000 mAh i płynną zmianę smaku.",
         "Jednorazowy waporyzator Stagbar 6in1 180 000 Puffs oferuje unikalny system 6 smaków z sześcioma niezależnymi cewkami mesh, baterię 1000 mAh z ładowaniem Type-C i płynne przełączanie między sześcioma smakami do 180 000 zaciągnięć."),
 },
 "jagger": {
  "en": ("Stagbar Jagger Pro 40K is a high-performance rechargeable disposable with 40,000 puffs, 22ml capacity, 750mAh battery and pro-level control.",
         "Stagbar Jagger Pro 40,000 Puffs is a high-performance rechargeable disposable with 22ml e-liquid, 750mAh battery with Type-C charging, 1.0 Ohm mesh coil and 20 flavors for pro-level, precise vaping."),
  "es": ("Stagbar Jagger Pro 40K es un desechable recargable de alto rendimiento con 40.000 caladas, 22 ml, batería de 750mAh y control profesional.",
         "Stagbar Jagger Pro 40.000 Puffs es un desechable recargable de alto rendimiento con 22 ml de e-líquido, batería de 750mAh con carga Type-C, bobina de malla de 1,0 ohmios y 20 sabores."),
  "fr": ("Stagbar Jagger Pro 40K est une cigarette jetable rechargeable haute performance avec 40 000 bouffées, 22 ml, batterie 750mAh et contrôle pro.",
         "Stagbar Jagger Pro 40 000 Puffs est une cigarette jetable rechargeable haute performance avec 22 ml d'e-liquide, batterie 750mAh avec charge Type-C, résistance mesh 1,0 ohm et 20 saveurs."),
  "de": ("Stagbar Jagger Pro 40K ist eine leistungsstarke wiederaufladbare Einweg-Vape mit 40.000 Zügen, 22 ml, 750mAh-Akku und Pro-Level-Steuerung.",
         "Stagbar Jagger Pro 40.000 Puffs ist eine leistungsstarke wiederaufladbare Einweg-Vape mit 22 ml Liquid, 750mAh-Akku mit Typ-C-Laden, 1,0-Ohm-Mesh-Coil und 20 Aromen."),
  "it": ("Stagbar Jagger Pro 40K è una sigaretta usa e getta ricaricabile ad alte prestazioni con 40.000 svapate, 22 ml, batteria da 750mAh e controllo professionale.",
         "Stagbar Jagger Pro 40.000 Puffs è una sigaretta usa e getta ricaricabile ad alte prestazioni con 22 ml di e-liquid, batteria 750mAh con ricarica Type-C, bobina mesh da 1,0 ohm e 20 gusti."),
  "pt": ("Stagbar Jagger Pro 40K é um descartável recarregável de alto desempenho com 40.000 baforadas, 22 ml, bateria de 750mAh e controle profissional.",
         "Stagbar Jagger Pro 40.000 Puffs é um descartável recarregável de alto desempenho com 22 ml de e-líquido, bateria de 750mAh com carga Type-C, bobina mesh de 1,0 ohm e 20 sabores."),
  "ru": ("Stagbar Jagger Pro 40K — высокопроизводительный перезаряжаемый одноразовый вейп на 40 000 затяжек, 22 мл, батарея 750 мАч и профессиональный контроль.",
         "Stagbar Jagger Pro 40 000 Puffs — высокопроизводительный перезаряжаемый одноразовый вейп с 22 мл жидкости, батареей 750 мАч и зарядкой Type-C, сетчатой катушкой 1,0 Ом и 20 вкусами."),
  "pl": ("Stagbar Jagger Pro 40K to wydajny ładowany waporyzator jednorazowy z 40 000 zaciągnięć, 22 ml, baterią 750 mAh i profesjonalną kontrolą.",
         "Stagbar Jagger Pro 40 000 Puffs to wydajny ładowany waporyzator jednorazowy z 22 ml liquidu, baterią 750 mAh z ładowaniem Type-C, cewką mesh 1,0 Ω i 20 smakami."),
 },
 "nexus": {
  "en": ("Stagbar Nexus 60K is a premium high-capacity disposable vape with 60,000 puffs, 30ml capacity, 850mAh battery and customizable airflow.",
         "Stagbar Nexus 60,000 Puffs is a premium high-capacity disposable with 30ml e-liquid, 850mAh battery with Type-C charging, 0.9 Ohm mesh coil and customizable airflow for endurance and flavor depth."),
  "es": ("Stagbar Nexus 60K es un vape desechable premium de alta capacidad con 60.000 caladas, 30 ml, batería de 850mAh y flujo de aire ajustable.",
         "Stagbar Nexus 60.000 Puffs es un vape desechable premium de alta capacidad con 30 ml de e-líquido, batería de 850mAh con carga Type-C, bobina de malla de 0,9 ohmios y flujo de aire ajustable."),
  "fr": ("Stagbar Nexus 60K est une vape jetable premium haute capacité avec 60 000 bouffées, 30 ml, batterie 850mAh et flux d'air réglable.",
         "Stagbar Nexus 60 000 Puffs est une vape jetable premium haute capacité avec 30 ml d'e-liquide, batterie 850mAh avec charge Type-C, résistance mesh 0,9 ohm et flux d'air réglable."),
  "de": ("Stagbar Nexus 60K ist eine Premium-Einweg-Vape mit hoher Kapazität: 60.000 Züge, 30 ml, 850mAh-Akku und einstellbarer Luftstrom.",
         "Stagbar Nexus 60.000 Puffs ist eine Premium-Einweg-Vape mit hoher Kapazität: 30 ml Liquid, 850mAh-Akku mit Typ-C-Laden, 0,9-Ohm-Mesh-Coil und einstellbarem Luftstrom."),
  "it": ("Stagbar Nexus 60K è una svapo usa e getta premium ad alta capacità con 60.000 svapate, 30 ml, batteria da 850mAh e flusso d'aria regolabile.",
         "Stagbar Nexus 60.000 Puffs è una sigaretta usa e getta premium ad alta capacità con 30 ml di e-liquid, batteria 850mAh con ricarica Type-C, bobina mesh da 0,9 ohm e flusso d'aria regolabile."),
  "pt": ("Stagbar Nexus 60K é um vape descartável premium de alta capacidade com 60.000 baforadas, 30 ml, bateria de 850mAh e fluxo de ar ajustável.",
         "Stagbar Nexus 60.000 Puffs é um vape descartável premium de alta capacidade com 30 ml de e-líquido, bateria de 850mAh com carga Type-C, bobina mesh de 0,9 ohm e fluxo de ar ajustável."),
  "ru": ("Stagbar Nexus 60K — премиальный одноразовый вейп высокой ёмкости на 60 000 затяжек, 30 мл, батарея 850 мАч и регулируемый воздушный поток.",
         "Stagbar Nexus 60 000 Puffs — премиальный одноразовый вейп высокой ёмкости с 30 мл жидкости, батареей 850 мАч и зарядкой Type-C, сетчатой катушкой 0,9 Ом и регулируемым воздушным потоком."),
  "pl": ("Stagbar Nexus 60K to premium jednorazowy waporyzator o wysokiej pojemności z 60 000 zaciągnięć, 30 ml, baterią 850 mAh i regulowanym przepływem powietrza.",
         "Stagbar Nexus 60 000 Puffs to premium jednorazowy waporyzator o wysokiej pojemności z 30 ml liquidu, baterią 850 mAh z ładowaniem Type-C, cewką mesh 0,9 Ω i regulowanym przepływem powietrza."),
 },
 "storm": {
  "en": ("Stag Bar Storm 50K disposable vape delivers 50,000 puffs of consistently rich flavor and smooth vapor, with 20ml capacity and 850mAh battery.",
         "Stag Bar Storm 50,000 Puffs disposable vape is effortless out of the box, offering 20ml e-liquid, 850mAh battery with Type-C charging, 1.0 Ohm mesh coil and 10 flavors for smooth, rich vapor."),
  "es": ("El vape desechable Stag Bar Storm 50K ofrece 50.000 caladas de sabor rico y vapor suave, con 20 ml y batería de 850mAh.",
         "El vape desechable Stag Bar Storm 50.000 Puffs es fácil de usar, con 20 ml de e-líquido, batería de 850mAh con carga Type-C, bobina de malla de 1,0 ohmios y 10 sabores."),
  "fr": ("La vape jetable Stag Bar Storm 50K offre 50 000 bouffées de saveur riche et vapeur douce, avec 20 ml et batterie 850mAh.",
         "La vape jetable Stag Bar Storm 50 000 Puffs est facile à utiliser, avec 20 ml d'e-liquide, batterie 850mAh avec charge Type-C, résistance mesh 1,0 ohm et 10 saveurs."),
  "de": ("Die Stag Bar Storm 50K Einweg-Vape liefert 50.000 Züge mit reichhaltigem Aroma und sanftem Dampf, 20 ml und 850mAh-Akku.",
         "Die Stag Bar Storm 50.000 Puffs Einweg-Vape ist sofort einsatzbereit: 20 ml Liquid, 850mAh-Akku mit Typ-C-Laden, 1,0-Ohm-Mesh-Coil und 10 Aromen."),
  "it": ("La sigaretta usa e getta Stag Bar Storm 50K offre 50.000 svapate di gusto ricco e vapore morbido, con 20 ml e batteria da 850mAh.",
         "La sigaretta usa e getta Stag Bar Storm 50.000 Puffs è pronta all'uso, con 20 ml di e-liquid, batteria 850mAh con ricarica Type-C, bobina mesh da 1,0 ohm e 10 gusti."),
  "pt": ("O vape descartável Stag Bar Storm 50K oferece 50.000 baforadas de sabor rico e vapor suave, com 20 ml e bateria de 850mAh.",
         "O vape descartável Stag Bar Storm 50.000 Puffs é fácil de usar, com 20 ml de e-líquido, bateria de 850mAh com carga Type-C, bobina mesh de 1,0 ohm e 10 sabores."),
  "ru": ("Одноразовый вейп Stag Bar Storm 50K обеспечивает 50 000 затяжек с насыщенным вкусом и мягким паром, 20 мл и батареей 850 мАч.",
         "Одноразовый вейп Stag Bar Storm 50 000 Puffs готов к использованию: 20 мл жидкости, батарея 850 мАч с зарядкой Type-C, сетчатая катушка 1,0 Ом и 10 вкусов."),
  "pl": ("Jednorazowy waporyzator Stag Bar Storm 50K zapewnia 50 000 zaciągnięć bogatego smaku i gładkiej pary, z 20 ml i baterią 850 mAh.",
         "Jednorazowy waporyzator Stag Bar Storm 50 000 Puffs jest gotowy do użycia: 20 ml liquidu, bateria 850 mAh z ładowaniem Type-C, cewka mesh 1,0 Ω i 10 smaków."),
 },
}


def build_content(p, lang):
    h = HEADINGS[lang]
    intro = f"<p class='mb-4'>{p['intro']}</p>"
    feat = "".join(f"<li>{f}</li>" for f in p["features"])
    spec = "".join(f"<li>{s}</li>" for s in p["specs"])
    flav = "".join(f"<li>{f}</li>" for f in p["flavors"])
    return (
        f"<div class='text-gray-800 font-sans'>\n{intro}\n"
        f"<p class='mb-4 font-semibold'>{h['feat']}:</p>\n<ul class='mb-4 list-disc pl-5'>{feat}</ul>\n"
        f"<p class='mb-4 font-semibold'>{h['spec']}:</p>\n<ul class='mb-4 list-disc pl-5'>{spec}</ul>\n"
        f"<p class='mb-4 font-semibold'>{h['flav']}:</p>\n<ul class='mb-4 list-disc pl-5'>{flav}</ul>\n"
        f"<p class='mb-4'>Stagbar / Vapesooo.</p>\n</div>"
    )


def build_entry(p):
    tr = TR[p["key"]]
    return {
        "name": p["name"],
        "menuTitle": p["menuTitle"],
        "title": p["title"],
        "puffs": p["puffs"],
        "slug": p["slug"],
        "original_excerpt": p["intro"],
        "original_content": p["intro"],
        "images": [{"url": C + p["img"], "alt": p["title"] + " Disposable Vape"}],
        "original_seo": {"description": tr["en"][1], "keywords": "Stagbar, " + p["title"] + ", disposable vape"},
        "content": {lang: build_content(p, lang) for lang in LOCALES},
        "excerpt": {lang: tr[lang][0] for lang in LOCALES},
        "seo": {lang: {"description": tr[lang][1], "keywords": "Stagbar, " + p["title"] + ", disposable vape"} for lang in LOCALES},
    }


def main():
    with open(PRODUCTS_PATH, encoding="utf-8") as f:
        data = json.load(f)
    if "Stagbar" in data:
        print("Stagbar already exists, abort")
        return
    entries = [build_entry(p) for p in PRODUCTS]
    data["Stagbar"] = {"sort": 999, "enabled": True, "products": entries}
    with open(PRODUCTS_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("added Stagbar with", len(entries), "products")


if __name__ == "__main__":
    main()
