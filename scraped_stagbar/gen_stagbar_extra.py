# -*- coding: utf-8 -*-
"""Add 5 new Stag Bar models (scraped from teesxvape.com) into the Stagbar brand in products.json."""
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
        "key": "gemini", "puffs": 30000,
        "title": "Stag Bar Gemini 30K", "menuTitle": "Stag Bar Gemini 30K Puffs",
        "name": "Stag Bar Gemini 30,000 Puffs Disposable Vape Double Flavor",
        "slug": "stagbar-gemini-30k-puffs",
        "img": "369862fd-0aa2-4f77-ae19-16260915d888",
        "intro": "Stag Bar Gemini 30,000 Puffs is a double-flavor disposable vape from the European warehouse, with 30ml e-liquid, a 750mAh rechargeable battery and 10 flavor combos to choose from.",
        "features": ["Double flavor in one device", "30ml e-liquid", "750mAh rechargeable battery with Type-C charging", "LED display", "10 flavor combinations"],
        "specs": ["Puff Count: up to 30,000", "E-liquid: 30ml", "Battery: 750mAh, Type-C", "Coil: 1.0 Ohm mesh coil", "Nicotine: 0% / 2% / 3% / 5%"],
        "flavors": ["10 double-flavor combinations (Grape Ice / Strawberry Kiwi, Blueberry Ice / Blue Razz, Blue Razz / Watermelon Ice, Cherry Ice / Blue Razz, Watermelon Ice / Strawberry Mango and more)"],
    },
    {
        "key": "jagger15k", "puffs": 15000,
        "title": "Stag Bar Jagger 15K", "menuTitle": "Stag Bar Jagger 15K Puffs",
        "name": "Stag Bar Jagger 15,000 Puffs Disposable Vape",
        "slug": "stagbar-jagger-15k-puffs",
        "img": "2ff17ead-da04-4c62-904b-77e641688f12",
        "intro": "Stag Bar Jagger 15,000 Puffs is a premium, cutting-edge disposable vape with 16ml e-liquid, a 650mAh rechargeable battery and 10 delicious flavors, supporting up to 15,000 puffs.",
        "features": ["Premium cutting-edge disposable vape", "16ml e-liquid", "650mAh rechargeable battery with Type-C charging", "10 delicious flavors"],
        "specs": ["Puff Count: up to 15,000", "E-liquid: 16ml", "Battery: 650mAh, Type-C", "Coil: 1.0 Ohm mesh coil", "Nicotine: 2% / 5%"],
        "flavors": ["Banana Ice, Blueberry Ice, Cherry Cranberry, Coco Loco, Lemon Lime, Peach Ice, Red Bull, Sex on the Beach, Strawberry Kiwi, Strawberry Watermelon"],
    },
    {
        "key": "king", "puffs": 40000,
        "title": "Stag Bar King 40K", "menuTitle": "Stag Bar King 40K Puffs",
        "name": "Stag Bar King 40,000 Puffs Disposable Vape",
        "slug": "stagbar-king-40k-puffs",
        "img": "25a1ea17-1e6f-4495-82cb-87a984c1a97f",
        "intro": "Stag Bar King 40,000 Puffs is a premium and cutting-edge disposable vape with 22ml e-liquid, a 1.0 Ohm mesh coil and a 750mAh rechargeable battery, supporting up to 40,000 puffs.",
        "features": ["Premium cutting-edge disposable vape", "22ml e-liquid", "750mAh rechargeable battery with Type-C charging", "10 delicious flavors"],
        "specs": ["Puff Count: up to 40,000", "E-liquid: 22ml", "Battery: 750mAh, Type-C", "Coil: 1.0 Ohm mesh coil", "Nicotine: 2% / 5%"],
        "flavors": ["Banana Ice, Blueberry Raspberry, Coco Loco, Lemon Lime, Mixed Berries, Red Bull, Sex on the Beach, Strawberry Grape, Strawberry Kiwi, Watermelon Ice"],
    },
    {
        "key": "pulse", "puffs": 35000,
        "title": "Stag Bar Pulse 35K", "menuTitle": "Stag Bar Pulse 35K Puffs",
        "name": "Stag Bar Pulse 35,000 Puffs Disposable Vape",
        "slug": "stagbar-pulse-35k-puffs",
        "img": "d356bc08-c258-4bdc-90b0-cfa37f7d70a6",
        "intro": "Stag Bar Pulse 35,000 Puffs is a disposable vape from the European warehouse, with 30ml e-liquid, a 750mAh rechargeable battery, an LED display and 10 flavors to choose from.",
        "features": ["30ml e-liquid", "750mAh rechargeable battery with Type-C charging", "LED display", "10 delicious flavors"],
        "specs": ["Puff Count: up to 35,000", "E-liquid: 30ml", "Battery: 750mAh, Type-C", "Coil: 1.0 Ohm mesh coil", "Nicotine: 0% / 2% / 3% / 5%"],
        "flavors": ["Watermelon Ice, Blueberry Raspberry, Blueberry Ice, Red Apple Ice, Strawberry Ice, Strawberry Kiwi, Blue Razz Ice, Fizzy Cherry, Strawberry Watermelon, Peach Mango Watermelon"],
    },
    {
        "key": "triple", "puffs": 60000,
        "title": "Stag Bar Triple 60K", "menuTitle": "Stag Bar Triple 60K Puffs",
        "name": "Stag Bar Triple 60,000 Puffs 3-in-1 Disposable Vape",
        "slug": "stagbar-triple-60k-puffs",
        "img": "08c5d5a9-21ad-42ba-ac64-57630009458c",
        "intro": "Stag Bar Triple 60,000 Puffs 3-in-1 features 3 flavors in one device, with 54ml e-liquid, a 650mAh rechargeable battery and 10 flavor combos, supporting up to 60,000 puffs.",
        "features": ["3 flavors in one device", "54ml e-liquid", "650mAh rechargeable battery with Type-C charging", "LCD display", "10 flavor combinations"],
        "specs": ["Puff Count: up to 60,000", "E-liquid: 54ml", "Battery: 650mAh, Type-C", "Coil: 0.9 Ohm mesh coil", "Nicotine: 2% / 5%"],
        "flavors": ["10 triple-flavor combinations (Strawberry Kiwi / Blueberry Ice / Watermelon Ice, Blue Razz Ice / Cranberry Grape / Strawberry Watermelon and more)"],
    },
]

TR = {
 "gemini": {
  "en": ("Stag Bar Gemini 30K double-flavor disposable vape offers 30ml e-liquid, 750mAh battery, LED display and 10 flavor combos for up to 30,000 puffs.",
         "Stag Bar Gemini 30,000 Puffs double-flavor disposable vape features 30ml e-liquid, 750mAh rechargeable battery with Type-C charging, LED display and 10 flavor combinations for up to 30,000 puffs."),
  "es": ("El vape desechable de doble sabor Stag Bar Gemini 30K ofrece 30 ml, batería de 750mAh, pantalla LED y 10 combos de sabor para hasta 30.000 caladas.",
         "El vape desechable de doble sabor Stag Bar Gemini 30.000 Puffs ofrece 30 ml de e-líquido, batería de 750mAh con carga Type-C, pantalla LED y 10 combinaciones de sabor para hasta 30.000 caladas."),
  "fr": ("La vape jetable double saveur Stag Bar Gemini 30K offre 30 ml, batterie 750mAh, écran LED et 10 combos de saveurs pour jusqu'à 30 000 bouffées.",
         "La vape jetable double saveur Stag Bar Gemini 30 000 Puffs offre 30 ml d'e-liquide, batterie 750mAh avec charge Type-C, écran LED et 10 combinaisons de saveurs pour jusqu'à 30 000 bouffées."),
  "de": ("Die Doppel-Aroma-Einweg-Vape Stag Bar Gemini 30K bietet 30 ml, 750mAh-Akku, LED-Display und 10 Aromen-Kombos für bis zu 30.000 Züge.",
         "Die Doppel-Aroma-Einweg-Vape Stag Bar Gemini 30.000 Puffs bietet 30 ml Liquid, 750mAh-Akku mit Typ-C-Laden, LED-Display und 10 Aromen-Kombinationen für bis zu 30.000 Züge."),
  "it": ("La sigaretta usa e getta double flavor Stag Bar Gemini 30K offre 30 ml, batteria da 750mAh, display LED e 10 combo di gusto per fino a 30.000 svapate.",
         "La sigaretta usa e getta double flavor Stag Bar Gemini 30.000 Puffs offre 30 ml di e-liquid, batteria 750mAh con ricarica Type-C, display LED e 10 combinazioni di gusto per fino a 30.000 svapate."),
  "pt": ("O vape descartável de sabor duplo Stag Bar Gemini 30K oferece 30 ml, bateria de 750mAh, tela LED e 10 combos de sabor para até 30.000 baforadas.",
         "O vape descartável de sabor duplo Stag Bar Gemini 30.000 Puffs oferece 30 ml de e-líquido, bateria de 750mAh com carga Type-C, tela LED e 10 combinações de sabor para até 30.000 baforadas."),
  "ru": ("Двухвкусовый одноразовый вейп Stag Bar Gemini 30K предлагает 30 мл, батарею 750 мАч, LED-дисплей и 10 вкусовых комбо до 30 000 затяжек.",
         "Двухвкусовый одноразовый вейп Stag Bar Gemini 30 000 Puffs предлагает 30 мл жидкости, батарею 750 мАч с зарядкой Type-C, LED-дисплей и 10 вкусовых комбинаций до 30 000 затяжек."),
  "pl": ("Dwusmakowy jednorazowy waporyzator Stag Bar Gemini 30K oferuje 30 ml, baterię 750 mAh, wyświetlacz LED i 10 kombinacji smaków do 30 000 zaciągnięć.",
         "Dwusmakowy jednorazowy waporyzator Stag Bar Gemini 30 000 Puffs oferuje 30 ml liquidu, baterię 750 mAh z ładowaniem Type-C, wyświetlacz LED i 10 kombinacji smaków do 30 000 zaciągnięć."),
 },
 "jagger15k": {
  "en": ("Stag Bar Jagger 15K disposable vape offers 16ml e-liquid, 650mAh battery and 10 flavors for up to 15,000 puffs.",
         "Stag Bar Jagger 15,000 Puffs disposable vape features 16ml e-liquid, 650mAh rechargeable battery with Type-C charging, 1.0 Ohm mesh coil and 10 flavors for a premium experience."),
  "es": ("El vape desechable Stag Bar Jagger 15K ofrece 16 ml, batería de 650mAh y 10 sabores para hasta 15.000 caladas.",
         "El vape desechable Stag Bar Jagger 15.000 Puffs ofrece 16 ml de e-líquido, batería de 650mAh con carga Type-C, bobina de malla de 1,0 ohmios y 10 sabores."),
  "fr": ("La vape jetable Stag Bar Jagger 15K offre 16 ml, batterie 650mAh et 10 saveurs pour jusqu'à 15 000 bouffées.",
         "La vape jetable Stag Bar Jagger 15 000 Puffs offre 16 ml d'e-liquide, batterie 650mAh avec charge Type-C, résistance mesh 1,0 ohm et 10 saveurs."),
  "de": ("Die Stag Bar Jagger 15K Einweg-Vape bietet 16 ml, 650mAh-Akku und 10 Aromen für bis zu 15.000 Züge.",
         "Die Stag Bar Jagger 15.000 Puffs Einweg-Vape bietet 16 ml Liquid, 650mAh-Akku mit Typ-C-Laden, 1,0-Ohm-Mesh-Coil und 10 Aromen."),
  "it": ("La sigaretta usa e getta Stag Bar Jagger 15K offre 16 ml, batteria da 650mAh e 10 gusti per fino a 15.000 svapate.",
         "La sigaretta usa e getta Stag Bar Jagger 15.000 Puffs offre 16 ml di e-liquid, batteria 650mAh con ricarica Type-C, bobina mesh da 1,0 ohm e 10 gusti."),
  "pt": ("O vape descartável Stag Bar Jagger 15K oferece 16 ml, bateria de 650mAh e 10 sabores para até 15.000 baforadas.",
         "O vape descartável Stag Bar Jagger 15.000 Puffs oferece 16 ml de e-líquido, bateria de 650mAh com carga Type-C, bobina mesh de 1,0 ohm e 10 sabores."),
  "ru": ("Одноразовый вейп Stag Bar Jagger 15K предлагает 16 мл, батарею 650 мАч и 10 вкусов до 15 000 затяжек.",
         "Одноразовый вейп Stag Bar Jagger 15 000 Puffs предлагает 16 мл жидкости, батарею 650 мАч с зарядкой Type-C, сетчатую катушку 1,0 Ом и 10 вкусов."),
  "pl": ("Jednorazowy waporyzator Stag Bar Jagger 15K oferuje 16 ml, baterię 650 mAh i 10 smaków do 15 000 zaciągnięć.",
         "Jednorazowy waporyzator Stag Bar Jagger 15 000 Puffs oferuje 16 ml liquidu, baterię 650 mAh z ładowaniem Type-C, cewkę mesh 1,0 Ω i 10 smaków."),
 },
 "king": {
  "en": ("Stag Bar King 40K disposable vape offers 22ml e-liquid, 750mAh battery and 10 flavors for up to 40,000 puffs.",
         "Stag Bar King 40,000 Puffs disposable vape features 22ml e-liquid, 750mAh rechargeable battery with Type-C charging, 1.0 Ohm mesh coil and 10 flavors for a premium experience."),
  "es": ("El vape desechable Stag Bar King 40K ofrece 22 ml, batería de 750mAh y 10 sabores para hasta 40.000 caladas.",
         "El vape desechable Stag Bar King 40.000 Puffs ofrece 22 ml de e-líquido, batería de 750mAh con carga Type-C, bobina de malla de 1,0 ohmios y 10 sabores."),
  "fr": ("La vape jetable Stag Bar King 40K offre 22 ml, batterie 750mAh et 10 saveurs pour jusqu'à 40 000 bouffées.",
         "La vape jetable Stag Bar King 40 000 Puffs offre 22 ml d'e-liquide, batterie 750mAh avec charge Type-C, résistance mesh 1,0 ohm et 10 saveurs."),
  "de": ("Die Stag Bar King 40K Einweg-Vape bietet 22 ml, 750mAh-Akku und 10 Aromen für bis zu 40.000 Züge.",
         "Die Stag Bar King 40.000 Puffs Einweg-Vape bietet 22 ml Liquid, 750mAh-Akku mit Typ-C-Laden, 1,0-Ohm-Mesh-Coil und 10 Aromen."),
  "it": ("La sigaretta usa e getta Stag Bar King 40K offre 22 ml, batteria da 750mAh e 10 gusti per fino a 40.000 svapate.",
         "La sigaretta usa e getta Stag Bar King 40.000 Puffs offre 22 ml di e-liquid, batteria 750mAh con ricarica Type-C, bobina mesh da 1,0 ohm e 10 gusti."),
  "pt": ("O vape descartável Stag Bar King 40K oferece 22 ml, bateria de 750mAh e 10 sabores para até 40.000 baforadas.",
         "O vape descartável Stag Bar King 40.000 Puffs oferece 22 ml de e-líquido, bateria de 750mAh com carga Type-C, bobina mesh de 1,0 ohm e 10 sabores."),
  "ru": ("Одноразовый вейп Stag Bar King 40K предлагает 22 мл, батарею 750 мАч и 10 вкусов до 40 000 затяжек.",
         "Одноразовый вейп Stag Bar King 40 000 Puffs предлагает 22 мл жидкости, батарею 750 мАч с зарядкой Type-C, сетчатую катушку 1,0 Ом и 10 вкусов."),
  "pl": ("Jednorazowy waporyzator Stag Bar King 40K oferuje 22 ml, baterię 750 mAh i 10 smaków do 40 000 zaciągnięć.",
         "Jednorazowy waporyzator Stag Bar King 40 000 Puffs oferuje 22 ml liquidu, baterię 750 mAh z ładowaniem Type-C, cewkę mesh 1,0 Ω i 10 smaków."),
 },
 "pulse": {
  "en": ("Stag Bar Pulse 35K disposable vape offers 30ml e-liquid, 750mAh battery, LED display and 10 flavors for up to 35,000 puffs.",
         "Stag Bar Pulse 35,000 Puffs disposable vape features 30ml e-liquid, 750mAh rechargeable battery with Type-C charging, LED display and 10 flavors for up to 35,000 puffs."),
  "es": ("El vape desechable Stag Bar Pulse 35K ofrece 30 ml, batería de 750mAh, pantalla LED y 10 sabores para hasta 35.000 caladas.",
         "El vape desechable Stag Bar Pulse 35.000 Puffs ofrece 30 ml de e-líquido, batería de 750mAh con carga Type-C, pantalla LED y 10 sabores para hasta 35.000 caladas."),
  "fr": ("La vape jetable Stag Bar Pulse 35K offre 30 ml, batterie 750mAh, écran LED et 10 saveurs pour jusqu'à 35 000 bouffées.",
         "La vape jetable Stag Bar Pulse 35 000 Puffs offre 30 ml d'e-liquide, batterie 750mAh avec charge Type-C, écran LED et 10 saveurs pour jusqu'à 35 000 bouffées."),
  "de": ("Die Stag Bar Pulse 35K Einweg-Vape bietet 30 ml, 750mAh-Akku, LED-Display und 10 Aromen für bis zu 35.000 Züge.",
         "Die Stag Bar Pulse 35.000 Puffs Einweg-Vape bietet 30 ml Liquid, 750mAh-Akku mit Typ-C-Laden, LED-Display und 10 Aromen für bis zu 35.000 Züge."),
  "it": ("La sigaretta usa e getta Stag Bar Pulse 35K offre 30 ml, batteria da 750mAh, display LED e 10 gusti per fino a 35.000 svapate.",
         "La sigaretta usa e getta Stag Bar Pulse 35.000 Puffs offre 30 ml di e-liquid, batteria 750mAh con ricarica Type-C, display LED e 10 gusti per fino a 35.000 svapate."),
  "pt": ("O vape descartável Stag Bar Pulse 35K oferece 30 ml, bateria de 750mAh, tela LED e 10 sabores para até 35.000 baforadas.",
         "O vape descartável Stag Bar Pulse 35.000 Puffs oferece 30 ml de e-líquido, bateria de 750mAh com carga Type-C, tela LED e 10 sabores para até 35.000 baforadas."),
  "ru": ("Одноразовый вейп Stag Bar Pulse 35K предлагает 30 мл, батарею 750 мАч, LED-дисплей и 10 вкусов до 35 000 затяжек.",
         "Одноразовый вейп Stag Bar Pulse 35 000 Puffs предлагает 30 мл жидкости, батарею 750 мАч с зарядкой Type-C, LED-дисплей и 10 вкусов до 35 000 затяжек."),
  "pl": ("Jednorazowy waporyzator Stag Bar Pulse 35K oferuje 30 ml, baterię 750 mAh, wyświetlacz LED i 10 smaków do 35 000 zaciągnięć.",
         "Jednorazowy waporyzator Stag Bar Pulse 35 000 Puffs oferuje 30 ml liquidu, baterię 750 mAh z ładowaniem Type-C, wyświetlacz LED i 10 smaków do 35 000 zaciągnięć."),
 },
 "triple": {
  "en": ("Stag Bar Triple 60K 3-in-1 disposable vape offers 54ml e-liquid, 650mAh battery and 10 flavor combos for up to 60,000 puffs.",
         "Stag Bar Triple 60,000 Puffs 3-in-1 disposable vape features 3 flavors in one device, 54ml e-liquid, 650mAh rechargeable battery with Type-C charging, LCD display and 10 flavor combos for up to 60,000 puffs."),
  "es": ("El vape desechable 3-en-1 Stag Bar Triple 60K ofrece 54 ml, batería de 650mAh y 10 combos de sabor para hasta 60.000 caladas.",
         "El vape desechable 3-en-1 Stag Bar Triple 60.000 Puffs ofrece 3 sabores en un dispositivo, 54 ml de e-líquido, batería de 650mAh con carga Type-C, pantalla LCD y 10 combos de sabor."),
  "fr": ("La vape jetable 3-en-1 Stag Bar Triple 60K offre 54 ml, batterie 650mAh et 10 combos de saveurs pour jusqu'à 60 000 bouffées.",
         "La vape jetable 3-en-1 Stag Bar Triple 60 000 Puffs offre 3 saveurs dans un appareil, 54 ml d'e-liquide, batterie 650mAh avec charge Type-C, écran LCD et 10 combos de saveurs."),
  "de": ("Die 3-in-1 Einweg-Vape Stag Bar Triple 60K bietet 54 ml, 650mAh-Akku und 10 Aromen-Kombos für bis zu 60.000 Züge.",
         "Die 3-in-1 Einweg-Vape Stag Bar Triple 60.000 Puffs bietet 3 Aromen in einem Gerät, 54 ml Liquid, 650mAh-Akku mit Typ-C-Laden, LCD-Display und 10 Aromen-Kombos."),
  "it": ("La sigaretta usa e getta 3-in-1 Stag Bar Triple 60K offre 54 ml, batteria da 650mAh e 10 combo di gusto per fino a 60.000 svapate.",
         "La sigaretta usa e getta 3-in-1 Stag Bar Triple 60.000 Puffs offre 3 gusti in un dispositivo, 54 ml di e-liquid, batteria 650mAh con ricarica Type-C, display LCD e 10 combo di gusto."),
  "pt": ("O vape descartável 3-em-1 Stag Bar Triple 60K oferece 54 ml, bateria de 650mAh e 10 combos de sabor para até 60.000 baforadas.",
         "O vape descartável 3-em-1 Stag Bar Triple 60.000 Puffs oferece 3 sabores em um dispositivo, 54 ml de e-líquido, bateria de 650mAh com carga Type-C, tela LCD e 10 combos de sabor."),
  "ru": ("Одноразовый вейп 3-в-1 Stag Bar Triple 60K предлагает 54 мл, батарею 650 мАч и 10 вкусовых комбо до 60 000 затяжек.",
         "Одноразовый вейп 3-в-1 Stag Bar Triple 60 000 Puffs предлагает 3 вкуса в одном устройстве, 54 мл жидкости, батарею 650 мАч с зарядкой Type-C, ЖК-дисплей и 10 вкусовых комбо."),
  "pl": ("Jednorazowy waporyzator 3-w-1 Stag Bar Triple 60K oferuje 54 ml, baterię 650 mAh i 10 kombinacji smaków do 60 000 zaciągnięć.",
         "Jednorazowy waporyzator 3-w-1 Stag Bar Triple 60 000 Puffs oferuje 3 smaki w jednym urządzeniu, 54 ml liquidu, baterię 650 mAh z ładowaniem Type-C, wyświetlacz LCD i 10 kombinacji smaków."),
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
        "name": p["name"], "menuTitle": p["menuTitle"], "title": p["title"], "puffs": p["puffs"],
        "slug": p["slug"], "original_excerpt": p["intro"], "original_content": p["intro"],
        "images": [{"url": C + p["img"], "alt": p["title"] + " Disposable Vape"}],
        "original_seo": {"description": tr["en"][1], "keywords": "Stagbar, " + p["title"] + ", disposable vape"},
        "content": {lang: build_content(p, lang) for lang in LOCALES},
        "excerpt": {lang: tr[lang][0] for lang in LOCALES},
        "seo": {lang: {"description": tr[lang][1], "keywords": "Stagbar, " + p["title"] + ", disposable vape"} for lang in LOCALES},
    }


def main():
    with open(PRODUCTS_PATH, encoding="utf-8") as f:
        data = json.load(f)
    brand = data["Stagbar"]
    existing = {p["slug"] for p in brand["products"]}
    added = []
    for p in PRODUCTS:
        e = build_entry(p)
        if e["slug"] in existing:
            print("SKIP existing:", e["slug"]); continue
        brand["products"].append(e)
        added.append(e["slug"])
        print("ADDED:", e["slug"])
    with open(PRODUCTS_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("added", len(added), "-> Stagbar now", len(brand["products"]))


if __name__ == "__main__":
    main()
