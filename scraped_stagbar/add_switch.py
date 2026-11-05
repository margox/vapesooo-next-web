#!/usr/bin/env python3
import json, copy

PATH = "src/data/products.json"

LANGS = ["en", "es", "fr", "de", "it", "pt", "ru", "pl"]

# Multilingual labels
FEAT_LABEL = {
    "en": "Key Features", "es": "Características principales", "fr": "Caractéristiques principales",
    "de": "Hauptmerkmale", "it": "Caratteristiche principali", "pt": "Principais recursos",
    "ru": "Основные характеристики", "pl": "Najważniejsze cechy",
}
SPEC_LABEL = {
    "en": "Specifications", "es": "Especificaciones", "fr": "Spécifications",
    "de": "Technische Daten", "it": "Specifiche", "pt": "Especificações",
    "ru": "Характеристики", "pl": "Specyfikacja",
}
FLAV_LABEL = {
    "en": "Available Flavors", "es": "Sabores disponibles", "fr": "Saveurs disponibles",
    "de": "Verfügbare Geschmacksrichtungen", "it": "Gusti disponibili", "pt": "Sabores disponíveis",
    "ru": "Доступные вкусы", "pl": "Dostępne smaki",
}

FLAVORS = [
    "Lime Edition: Lemon Lime / Strawberry Kiwi / Mint Ice / Dragon Fruit Banana Cherry",
    "Fruit Edition: Watermelon Ice / Raspberry Cherry Ice / Kiwi Passion Fruit Guava / Cola Ice",
    "Berry Edition: Blueberry Ice / Mixed Berries / Mr Blue / Strawberry Raspberry Cherry Ice",
    "Cool Edition: Black Dragon Ice / Peach Berry / Triple Melon / Red Bull",
]

def build_content(kind):
    if kind == "device":
        intro = ("The Stagbar Switch 240K features a 4-flavor rotating pod system with four independent "
                 "mesh coils, a 1000mAh battery with adjustable power and a Turbo LED display, delivering up to 240,000 puffs.")
        feats = [
            "4 flavors in 1 device (rotate to switch)",
            "4 independent mesh coils",
            "1000mAh battery with Type-C charging",
            "Adjustable power output",
            "Turbo LED display (battery + e-liquid)",
        ]
        spec = [
            "Puff Count: up to 240,000",
            "Flavors: 4 in 1, rotating",
            "Battery: 1000mAh, Type-C",
            "Coil: 4 mesh coils",
            "Power: adjustable",
            "Nicotine: 2% / 5%",
        ]
    else:
        intro = ("The Stagbar Switch 240K Pod System Kit pairs a rechargeable 1000mAh battery base with "
                 "swappable 4-in-1 flavor pods. Rotate the pod to switch between four flavors, four mesh coils "
                 "deliver consistent taste, and the Turbo LED display shows battery and e-liquid status.")
        feats = [
            "Rechargeable pod system kit",
            "4 flavors per pod, rotate to switch",
            "4 independent mesh coils per pod",
            "1000mAh battery, adjustable power, Type-C",
            "Turbo LED display",
        ]
        spec = [
            "Puff Count: up to 240,000 per pod",
            "Pods: swappable 4-in-1 flavor pods",
            "Battery: 1000mAh, Type-C",
            "Coil: 4 mesh coils per pod",
            "Power: adjustable",
            "Nicotine: 2% / 5%",
        ]
    out = {}
    for l in LANGS:
        parts = [
            "<div class='text-gray-800 font-sans'>",
            f"<p class='mb-4'>{intro}</p>",
            f"<p class='mb-4 font-semibold'>{FEAT_LABEL[l]}:</p>",
            "<ul class='mb-4 list-disc pl-5'>" + "".join(f"<li>{f}</li>" for f in feats) + "</ul>",
            f"<p class='mb-4 font-semibold'>{SPEC_LABEL[l]}:</p>",
            "<ul class='mb-4 list-disc pl-5'>" + "".join(f"<li>{s}</li>" for s in spec) + "</ul>",
            f"<p class='mb-4 font-semibold'>{FLAV_LABEL[l]}:</p>",
            "<ul class='mb-4 list-disc pl-5'>" + "".join(f"<li>{f}</li>" for f in FLAVORS) + "</ul>",
            "<p class='mb-4'>Stagbar / Vapesooo.</p>",
            "</div>",
        ]
        out[l] = "\n".join(parts)
    return out

def build_excerpts(kind):
    if kind == "device":
        t = "Stagbar Switch 240K disposable vape offers a 4-flavor rotating system, four mesh coils, 1000mAh adjustable-power battery and Turbo LED display for up to 240,000 puffs."
    else:
        t = "Stagbar Switch 240K Pod System Kit offers swappable 4-in-1 flavor pods, four mesh coils, 1000mAh adjustable-power battery and Turbo LED display."
    return {
        "en": t,
        "es": t.replace("disposable vape offers", "vape desechable ofrece").replace("Pod System Kit offers", "Pod System Kit ofrece").replace("for up to 240,000 puffs", "para hasta 240.000 caladas."),
        "fr": t.replace("disposable vape offers", "vape jetable offre").replace("for up to 240,000 puffs", "pour jusqu'à 240 000 bouffées."),
        "de": t.replace("disposable vape offers", "Einweg-Vape bietet").replace("for up to 240,000 puffs", "für bis zu 240.000 Züge."),
        "it": t.replace("disposable vape offers", "sigaretta usa e getta offre").replace("for up to 240,000 puffs", "per fino a 240.000 svapate."),
        "pt": t.replace("disposable vape offers", "vape descartável oferece").replace("for up to 240,000 puffs", "para até 240.000 baforadas."),
        "ru": t.replace("disposable vape offers", "одноразовый вейп предлагает").replace("for up to 240,000 puffs", "до 240 000 затяжек."),
        "pl": t.replace("disposable vape offers", "jednorazowy waporyzator oferuje").replace("for up to 240,000 puffs", "do 240 000 zaciągnięć."),
    }

def build_seo(kind):
    if kind == "device":
        desc = ("Stagbar Switch 240,000 Puffs disposable vape features a 4-flavor rotating pod system, four mesh coils, "
                "1000mAh adjustable-power battery with Type-C charging and Turbo LED display.")
    else:
        desc = ("Stagbar Switch 240K Pod System Kit features swappable 4-in-1 flavor pods, four mesh coils, "
                "1000mAh adjustable-power battery with Type-C charging and Turbo LED display.")
    kw = ("Stagbar, Stagbar Switch 240K, disposable vape" if kind == "device"
          else "Stagbar, Stagbar Switch 240K Pod, pod system kit")
    out = {}
    for l in LANGS:
        d = desc
        if l == "es": d = desc.replace("features", "ofrece").replace("disposable vape", "vape desechable").replace("Pod System Kit", "Pod System Kit")
        if l == "de": d = desc.replace("features", "bietet").replace("disposable vape", "Einweg-Vape")
        out[l] = {"description": d, "keywords": kw}
    return out

def build_entry(kind):
    if kind == "device":
        return {
            "name": "Stagbar Switch 240,000 Puffs Disposable Vape",
            "menuTitle": "Stagbar Switch 240K Puffs",
            "title": "Stagbar Switch 240K",
            "puffs": 240000,
            "slug": "stagbar-switch-240k-puffs",
            "original_excerpt": "The Stagbar Switch 240K offers a 4-flavor rotating pod system with four mesh coils, 1000mAh adjustable-power battery and Turbo LED display for up to 240,000 puffs.",
            "original_content": "The Stagbar Switch 240K offers a 4-flavor rotating pod system with four mesh coils, 1000mAh adjustable-power battery and Turbo LED display for up to 240,000 puffs.",
            "images": [
                {"url": "/images/products/switch-240k.jpg", "alt": "Stagbar Switch 240K Disposable Vape"},
            ],
            "original_seo": {
                "description": "Stagbar Switch 240,000 Puffs disposable vape features a 4-flavor rotating pod system, four mesh coils, 1000mAh adjustable-power battery with Type-C charging and Turbo LED display.",
                "keywords": "Stagbar, Stagbar Switch 240K, disposable vape",
            },
            "content": build_content("device"),
            "excerpt": build_excerpts("device"),
            "seo": build_seo("device"),
        }
    else:
        return {
            "name": "Stagbar Switch 240K Pod System Kit",
            "menuTitle": "Stagbar Switch 240K Pod",
            "title": "Stagbar Switch 240K Pod",
            "puffs": 240000,
            "slug": "stagbar-switch-240k-pod",
            "original_excerpt": "The Stagbar Switch 240K Pod System Kit pairs a 1000mAh rechargeable battery base with swappable 4-in-1 flavor pods, four mesh coils and Turbo LED display.",
            "original_content": "The Stagbar Switch 240K Pod System Kit pairs a 1000mAh rechargeable battery base with swappable 4-in-1 flavor pods, four mesh coils and Turbo LED display.",
            "images": [
                {"url": "/images/products/switch-pod-hero.jpg", "alt": "Stagbar Switch 240K Pod System Kit"},
                {"url": "/images/products/switch-pod-black.jpg", "alt": "Stagbar Switch Pod black edition"},
                {"url": "/images/products/switch-pod-blue.jpg", "alt": "Stagbar Switch Pod breeze blue"},
                {"url": "/images/products/switch-pod-box.jpg", "alt": "Stagbar Switch 240K Pod retail box"},
            ],
            "original_seo": {
                "description": "Stagbar Switch 240K Pod System Kit features swappable 4-in-1 flavor pods, four mesh coils, 1000mAh adjustable-power battery with Type-C charging and Turbo LED display.",
                "keywords": "Stagbar, Stagbar Switch 240K Pod, pod system kit",
            },
            "content": build_content("pod"),
            "excerpt": build_excerpts("pod"),
            "seo": build_seo("pod"),
        }

with open(PATH, encoding="utf-8") as f:
    data = json.load(f)

stag = data["Stagbar"]["products"]
# avoid dupes
existing = {p["slug"] for p in stag}
new_entries = [build_entry("device"), build_entry("pod")]
added = 0
for e in new_entries:
    if e["slug"] not in existing:
        stag.append(e)
        added += 1

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"Added {added} products. Stagbar now has {len(stag)} products.")
print("Slugs:", [p["slug"] for p in stag])
