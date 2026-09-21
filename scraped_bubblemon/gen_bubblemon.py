# -*- coding: utf-8 -*-
"""Generate Bubblemon brand block (4 products) for vapesooo products.json"""
import json

LANGS = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'pl']
COS = 'https://vapesooo-1318551956.cos.accelerate.myqcloud.com/products'

FLAVORS_16 = [
    'Strawberry Yogurt', 'Aloe Grape', 'Blackcurrant Mint', 'Blue Ocean',
    'Lemon', 'Peach Mango', 'Pineapple Apple', 'Watermelon',
    'Peach Ice', 'Mango', 'Mint', 'Blueberry',
    'Blueberry Watermelon', 'Blueberry Cherry', 'Green Grape', 'Honey Coconut',
]

def html_content(desc, features, specs, flavors=None, tail='Bubblemon / Vapesooo.'):
    out = ["<div class='text-gray-800 font-sans'>"]
    out.append(f"<p class='mb-4'>{desc}</p>")
    out.append("<p class='mb-4 font-semibold'>Key Features:</p>")
    out.append("<ul class='mb-4 list-disc pl-5'>" + ''.join(f"<li>{x}</li>" for x in features) + "</ul>")
    out.append("<p class='mb-4 font-semibold'>Specifications:</p>")
    out.append("<ul class='mb-4 list-disc pl-5'>" + ''.join(f"<li>{x}</li>" for x in specs) + "</ul>")
    if flavors:
        out.append("<p class='mb-4 font-semibold'>Available Flavors:</p>")
        out.append("<ul class='mb-4 list-disc pl-5'><li>" + ' / '.join(flavors) + "</li></ul>")
    out.append(f"<p class='mb-4'>{tail}</p>")
    out.append("</div>")
    return '\n'.join(out)

# ---------- translations ----------
def tr(d, lang):
    return d[lang]

# EN descriptions
DESC = {
 'v1': "The Bubblemon Graffiti-C 30,000 is the 1st-generation starry graffiti vape from Bubblemon, Korea's iconic vape brand. It pairs a colorful starry display with dual mesh coils and two adjustable output modes for up to 30,000 puffs.",
 'v2': "The Bubblemon Graffiti 2 30,000 is the 2nd-generation graffiti vape from Bubblemon with three switchable output modes, a large 16ml pod and a colorful screen, delivering up to 30,000 puffs.",
 'v3': "The Bubblemon Graffiti 3 30,000 is the 3rd-generation starry colorful vape from Bubblemon. It features a starry display, dual mesh coils and two adjustable output modes for up to 30,000 puffs.",
 'v4': "The Bubblemon Galaxy is the 4th-generation NEW Graffiti-3 Galaxy Edition device from Bubblemon. It is a device + pod system that pairs the Galaxy Edition device with a 30ml BIZZ pod (0.98% nicotine) for a large-capacity vaping experience.",
}
FEAT = {
 'v1': ['Colorful starry graffiti display', 'Dual mesh coils', '2 output modes: Normal 10.8W+3.2W, Turbo 10.8W+10.8W', '800mAh battery with Type-C charging', '0.98% nicotine', '16 flavor editions'],
 'v2': ['3 switchable output modes', 'Colorful screen display', 'Large 16ml pod', '800mAh battery with Type-C charging', '16 flavor editions'],
 'v3': ['Starry colorful display', 'Dual mesh coils', '2 output modes: Normal and Turbo', '800mAh battery with Type-C charging', '0.98% nicotine', '16 flavor editions'],
 'v4': ['4th-generation NEW Graffiti-3 Galaxy Edition', 'Device + pod set', '30ml BIZZ pod (0.98% nicotine)', 'Type-C charging', 'LED effects', 'BIZZ 11 flavor editions + BIZZPLUS 6 flavor editions'],
}
SPEC = {
 'v1': ['Puff Count: up to 30,000', 'Battery: 800mAh, Type-C', 'Coil: dual mesh coils', 'Modes: Normal / Turbo', 'Nicotine: 0.98%'],
 'v2': ['Puff Count: up to 30,000', 'E-liquid: 16ml', 'Battery: 800mAh, Type-C', 'Modes: 3 switchable modes', 'Nicotine: 0.98%'],
 'v3': ['Puff Count: up to 30,000', 'Battery: 800mAh, Type-C', 'Coil: dual mesh coils', 'Modes: Normal / Turbo', 'Nicotine: 0.98%'],
 'v4': ['Device: NEW Graffiti-3 Galaxy Edition (3 colors)', 'Pod: 30ml BIZZ pod', 'Nicotine: 0.98%', 'BIZZ: 11 flavor editions / BIZZPLUS: 6 flavor editions'],
}

def translate_block(src, lang):
    """Translate key texts to target language (manual, following Stagbar style)."""
    if lang == 'en':
        return src
    M = {
        'es': {'Puff Count': 'Número de caladas', 'Battery': 'Batería', 'Type-C': 'carga Type-C',
               'Coil': 'Bobina', 'Modes': 'Modos', 'Normal': 'Normal', 'Turbo': 'Turbo',
               'Nicotine': 'Nicotina', 'E-liquid': 'Líquido', 'Key Features': 'Características principales',
               'Specifications': 'Especificaciones', 'Available Flavors': 'Sabores disponibles',
               'disposable vape': 'vape desechable', 'puffs': 'caladas', 'device': 'dispositivo',
               'pod': 'cápsula', 'editions': 'ediciones', 'flavor': 'sabor'},
        'fr': {'Puff Count': 'Nombre de bouffées', 'Battery': 'Batterie', 'Type-C': 'charge Type-C',
               'Coil': 'Résistance', 'Modes': 'Modes', 'Normal': 'Normal', 'Turbo': 'Turbo',
               'Nicotine': 'Nicotine', 'E-liquid': 'E-liquide', 'Key Features': 'Caractéristiques principales',
               'Specifications': 'Spécifications', 'Available Flavors': 'Saveurs disponibles',
               'disposable vape': 'vape jetable', 'puffs': 'bouffées', 'device': 'appareil',
               'pod': 'pod', 'editions': 'éditions', 'flavor': 'saveur'},
        'de': {'Puff Count': 'Zugzahl', 'Battery': 'Akku', 'Type-C': 'Type-C-Ladung',
               'Coil': 'Coil', 'Modes': 'Modi', 'Normal': 'Normal', 'Turbo': 'Turbo',
               'Nicotine': 'Nikotin', 'E-liquid': 'Liquid', 'Key Features': 'Hauptmerkmale',
               'Specifications': 'Technische Daten', 'Available Flavors': 'Verfügbare Aromen',
               'disposable vape': 'Einweg-Vape', 'puffs': 'Züge', 'device': 'Gerät',
               'pod': 'Pod', 'editions': 'Editionen', 'flavor': 'Geschmack'},
        'it': {'Puff Count': 'Numero di svapate', 'Battery': 'Batteria', 'Type-C': 'ricarica Type-C',
               'Coil': 'Resistenza', 'Modes': 'Modalità', 'Normal': 'Normale', 'Turbo': 'Turbo',
               'Nicotine': 'Nicotina', 'E-liquid': 'Liquido', 'Key Features': 'Caratteristiche principali',
               'Specifications': 'Specifiche', 'Available Flavors': 'Gusti disponibili',
               'disposable vape': 'svapo usa e getta', 'puffs': 'svapate', 'device': 'dispositivo',
               'pod': 'pod', 'editions': 'edizioni', 'flavor': 'gusto'},
        'pt': {'Puff Count': 'Número de tragadas', 'Battery': 'Bateria', 'Type-C': 'carregamento Type-C',
               'Coil': 'Bobina', 'Modes': 'Modos', 'Normal': 'Normal', 'Turbo': 'Turbo',
               'Nicotine': 'Nicotina', 'E-liquid': 'Líquido', 'Key Features': 'Principais recursos',
               'Specifications': 'Especificações', 'Available Flavors': 'Sabores disponíveis',
               'disposable vape': 'vape descartável', 'puffs': 'tragadas', 'device': 'dispositivo',
               'pod': 'pod', 'editions': 'edições', 'flavor': 'sabor'},
        'ru': {'Puff Count': 'Количество затяжек', 'Battery': 'Аккумулятор', 'Type-C': 'зарядка Type-C',
               'Coil': 'Спираль', 'Modes': 'Режимы', 'Normal': 'Обычный', 'Turbo': 'Турбо',
               'Nicotine': 'Никотин', 'E-liquid': 'Жидкость', 'Key Features': 'Ключевые особенности',
               'Specifications': 'Характеристики', 'Available Flavors': 'Доступные вкусы',
               'disposable vape': 'одноразовый вейп', 'puffs': 'затяжек', 'device': 'устройство',
               'pod': 'картридж', 'editions': 'версий', 'flavor': 'вкус'},
        'pl': {'Puff Count': 'Liczba zaciągnięć', 'Battery': 'Bateria', 'Type-C': 'ładowanie Type-C',
               'Coil': 'Grzałka', 'Modes': 'Tryby', 'Normal': 'Normalny', 'Turbo': 'Turbo',
               'Nicotine': 'Nikotyna', 'E-liquid': 'Liquid', 'Key Features': 'Najważniejsze cechy',
               'Specifications': 'Specyfikacje', 'Available Flavors': 'Dostępne smaki',
               'disposable vape': 'jednorazowy waporyzator', 'puffs': 'zaciągnięć', 'device': 'urządzenie',
               'pod': 'kartridż', 'editions': 'edycji', 'flavor': 'smak'},
    }
    m = M.get(lang, M['es'])
    for k, v in m.items():
        src = src.replace(k, v)
    return src

def local_excerpt(v, lang):
    base = {
     'v1': ("Bubblemon Graffiti-C 30K disposable vape brings the starry graffiti design, dual mesh coils and "
            "normal/turbo modes with an 800mAh Type-C battery for up to 30,000 puffs and 16 flavors."),
     'v2': ("Bubblemon Graffiti 2 30K disposable vape features 3 switchable modes, a 16ml pod and 800mAh Type-C "
            "battery for up to 30,000 puffs and 16 flavors."),
     'v3': ("Bubblemon Graffiti 3 30K disposable vape combines a starry display, dual mesh coils and normal/turbo "
            "modes with an 800mAh Type-C battery for up to 30,000 puffs and 16 flavors."),
     'v4': ("Bubblemon Galaxy is the 4th-generation NEW Graffiti-3 Galaxy Edition device paired with a 30ml BIZZ "
            "pod (0.98% nicotine) for a large-capacity vaping experience with BIZZ and BIZZPLUS flavors."),
    }[v]
    return translate_block(base, lang)

def local_seo_desc(v, lang):
    base = {
     'v1': ("Bubblemon Graffiti-C 30,000 Puffs disposable vape features a colorful starry display, dual mesh coils, "
            "normal and turbo modes, 800mAh Type-C battery and 0.98% nicotine. 16 flavor editions available."),
     'v2': ("Bubblemon Graffiti 2 30,000 Puffs disposable vape offers 3 switchable modes, a 16ml pod, 800mAh Type-C "
            "battery and colorful screen. 16 flavor editions available."),
     'v3': ("Bubblemon Graffiti 3 30,000 Puffs disposable vape features a starry display, dual mesh coils, normal and "
            "turbo modes, 800mAh Type-C battery and 0.98% nicotine. 16 flavor editions available."),
     'v4': ("Bubblemon Galaxy is the 4th-generation NEW Graffiti-3 Galaxy Edition device with a 30ml BIZZ pod "
            "(0.98% nicotine), Type-C charging and LED effects. BIZZ and BIZZPLUS flavor editions available."),
    }[v]
    return translate_block(base, lang)

def make_product(v, img, puffs, title, menu_title, name, slug, desc, features, specs, flavors):
    en_content = html_content(desc, features, specs, flavors)
    p = {
        'name': name,
        'menuTitle': menu_title,
        'title': title,
        'puffs': puffs,
        'slug': slug,
        'original_excerpt': desc,
        'original_content': desc,
        'images': [{'url': img, 'alt': f'{title} Disposable Vape'}],
        'original_seo': {'description': local_seo_desc(v, 'en'),
                         'keywords': f'Bubblemon, {title}, disposable vape'},
        'content': {},
        'excerpt': {},
        'seo': {},
    }
    for L in LANGS:
        p['content'][L] = en_content if L == 'en' else html_content(
            translate_block(desc, L), [translate_block(x, L) for x in features],
            [translate_block(x, L) for x in specs],
            flavors, tail=('Bubblemon / Vapesooo.'))
        p['excerpt'][L] = local_excerpt(v, L)
        p['seo'][L] = {'description': local_seo_desc(v, L),
                       'keywords': f'Bubblemon, {title}, disposable vape'}
    return p

IMGS = {
 'v1': f'{COS}/666082cc-1467-4332-aeb0-b0347ca6dd64',
 'v2': f'{COS}/0e0c21d2-7924-40d1-a6f3-87964095a967',
 'v3': f'{COS}/29c01adc-b377-440e-aa5d-1be479185cf5',
 'v4': f'{COS}/2c9df73f-1e2e-468a-906f-d702680c2cd4',
}

products = [
    make_product('v1', IMGS['v1'], 30000, 'Bubblemon Graffiti-C 30K', 'Bubblemon Graffiti-C 30K Puffs',
                 'Bubblemon Graffiti-C 30,000 Puffs Disposable Vape', 'bubblemon-graffiti-c-30k-puffs',
                 DESC['v1'], FEAT['v1'], SPEC['v1'], FLAVORS_16),
    make_product('v2', IMGS['v2'], 30000, 'Bubblemon Graffiti 2 30K', 'Bubblemon Graffiti 2 30K Puffs',
                 'Bubblemon Graffiti 2 30,000 Puffs Disposable Vape', 'bubblemon-graffiti-2-30k-puffs',
                 DESC['v2'], FEAT['v2'], SPEC['v2'], FLAVORS_16),
    make_product('v3', IMGS['v3'], 30000, 'Bubblemon Graffiti 3 30K', 'Bubblemon Graffiti 3 30K Puffs',
                 'Bubblemon Graffiti 3 30,000 Puffs Disposable Vape', 'bubblemon-graffiti-3-30k-puffs',
                 DESC['v3'], FEAT['v3'], SPEC['v3'], FLAVORS_16),
    make_product('v4', IMGS['v4'], 30000, 'Bubblemon Galaxy', 'Bubblemon Galaxy',
                 'Bubblemon Galaxy 4th Gen Device + 30ml Pod', 'bubblemon-galaxy',
                 DESC['v4'], FEAT['v4'], SPEC['v4'], None),
]

block = {
    'sort': 1000,
    'enabled': True,
    'products': products,
}

with open('/tmp/bubo/bubblemon_block.json', 'w', encoding='utf-8') as f:
    json.dump(block, f, ensure_ascii=False, indent=2)
print('written', len(products), 'products')
