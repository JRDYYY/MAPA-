/* =========================================================
   BYDLENÍ – INTERAKTIVNÍ MAPA ČR
   GitHub Pages / HTML + CSS + JS + Leaflet
========================================================= */


/* ---------------------------------------------------------
   ZÁKLADNÍ NASTAVENÍ
--------------------------------------------------------- */

const CZ_CENTER = [49.7437, 15.3386];
const CZ_ZOOM = 7.5;

const CZ_GEOJSON =
    "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/CZE.geo.json";


/* ---------------------------------------------------------
   ZDROJE DAT
--------------------------------------------------------- */

const DATA_SOURCES = {

    prices: {
        name: "RealityMIX",
        updated: "09/2026",
        type: "REAL DATA",
        url: "https://realitymix.cz/statistika-nemovitosti/"
    },

    rent: {
        name: "RealityMIX",
        updated: "09/2026",
        type: "REAL DATA",
        url: "https://realitymix.cz/statistika-nemovitosti/byty-pronajem-prumerna-cena-pronajmu-1m2-mesic.html"
    },

    demo: {
        name: "DEMO DATA",
        updated: "DEMO",
        type: "DEMO"
    }

};


/* ---------------------------------------------------------
   KRAJE
--------------------------------------------------------- */

const REGIONS = [
    "Hlavní město Praha",
    "Jihomoravský kraj",
    "Moravskoslezský kraj",
    "Plzeňský kraj",
    "Liberecký kraj",
    "Olomoucký kraj",
    "Jihočeský kraj",
    "Královéhradecký kraj",
    "Ústecký kraj",
    "Pardubický kraj",
    "Zlínský kraj",
    "Karlovarský kraj",
    "Kraj Vysočina"
];


/* ---------------------------------------------------------
   DATA 13 KRAJSKÝCH MĚST
--------------------------------------------------------- */

const CITIES = [

    {
        id: "praha",
        name: "Praha",
        region: "Hlavní město Praha",
        lat: 50.0755,
        lng: 14.4378,
        radius: 4500,

        price: 154338,
        rent: 465,

        green: 38,
        noise: 64,

        demo: {
            transport: 96,
            services: 98,
            schools: 95,
            parking: 48,
            safety: 76,
            flood: 42,
            development: 83
        },

        advantages: [
            "Velmi vysoká dostupnost služeb",
            "Rozsáhlá síť veřejné dopravy",
            "Velké množství pracovních a občanských příležitostí"
        ],

        risks: [
            "Vyšší cenová hladina",
            "Lokálně vyšší dopravní zatížení",
            "Vyšší tlak na parkování"
        ]
    },


    {
        id: "brno",
        name: "Brno",
        region: "Jihomoravský kraj",
        lat: 49.1951,
        lng: 16.6068,
        radius: 4200,

        price: 123456,
        rent: 463,

        green: 47,
        noise: 52,

        demo: {
            transport: 86,
            services: 91,
            schools: 90,
            parking: 59,
            safety: 82,
            flood: 36,
            development: 89
        },

        advantages: [
            "Silná nabídka služeb",
            "Rozvinutá MHD",
            "Výrazné centrum technologií a univerzit"
        ],

        risks: [
            "Růst cen bydlení",
            "Dopravní zatížení některých částí",
            "Tlak na parkovací kapacity"
        ]
    },


    {
        id: "ostrava",
        name: "Ostrava",
        region: "Moravskoslezský kraj",
        lat: 49.8209,
        lng: 18.2625,
        radius: 4300,

        price: 71032,
        rent: 250,

        green: 52,
        noise: 49,

        demo: {
            transport: 78,
            services: 82,
            schools: 84,
            parking: 72,
            safety: 73,
            flood: 45,
            development: 80
        },

        advantages: [
            "Nižší cenová hladina než v Praze a Brně",
            "Rozvinutá městská doprava",
            "Velké rozvojové plochy"
        ],

        risks: [
            "Lokální dopravní a průmyslová zátěž",
            "Rozdílná kvalita jednotlivých lokalit",
            "Vyšší rozdíly mezi městskými částmi"
        ]
    },


    {
        id: "plzen",
        name: "Plzeň",
        region: "Plzeňský kraj",
        lat: 49.7384,
        lng: 13.3736,
        radius: 3800,

        price: 94816,
        rent: 292,

        green: 51,
        noise: 44,

        demo: {
            transport: 82,
            services: 86,
            schools: 84,
            parking: 70,
            safety: 81,
            flood: 39,
            development: 78
        },

        advantages: [
            "Dobrá dopravní dostupnost",
            "Silná nabídka služeb",
            "Dobrá dostupnost centra"
        ],

        risks: [
            "Lokální dopravní zatížení",
            "Růst cen v atraktivnějších částech",
            "Rozdílná dostupnost parkování"
        ]
    },


    {
        id: "liberec",
        name: "Liberec",
        region: "Liberecký kraj",
        lat: 50.7663,
        lng: 15.0543,
        radius: 3500,

        price: 83642,
        rent: 290,

        green: 72,
        noise: 34,

        demo: {
            transport: 70,
            services: 75,
            schools: 78,
            parking: 67,
            safety: 84,
            flood: 32,
            development: 71
        },

        advantages: [
            "Vysoký podíl zelených ploch",
            "Blízkost přírody",
            "Relativně klidné lokality"
        ],

        risks: [
            "Členitější terén",
            "Horší dostupnost některých okrajových částí",
            "Lokální dopravní omezení"
        ]
    },


    {
        id: "olomouc",
        name: "Olomouc",
        region: "Olomoucký kraj",
        lat: 49.5938,
        lng: 17.2509,
        radius: 3500,

        price: 86539,
        rent: 280,

        green: 61,
        noise: 37,

        demo: {
            transport: 79,
            services: 83,
            schools: 88,
            parking: 64,
            safety: 84,
            flood: 51,
            development: 79
        },

        advantages: [
            "Univerzitní město",
            "Dobrá občanská vybavenost",
            "Kompaktní městské centrum"
        ],

        risks: [
            "Lokální povodňové riziko",
            "Omezené parkování v centru",
            "Rozdíly mezi centrem a okraji"
        ]
    },


    {
        id: "ceske-budejovice",
        name: "České Budějovice",
        region: "Jihočeský kraj",
        lat: 48.9745,
        lng: 14.4743,
        radius: 3500,

        price: 87304,
        rent: 276,

        green: 64,
        noise: 36,

        demo: {
            transport: 77,
            services: 82,
            schools: 82,
            parking: 66,
            safety: 85,
            flood: 55,
            development: 81
        },

        advantages: [
            "Dobrá občanská vybavenost",
            "Poměrně kompaktní město",
            "Blízkost přírody"
        ],

        risks: [
            "Lokální povodňové riziko",
            "Dopravní zatížení hlavních tahů",
            "Omezené kapacity v centru"
        ]
    },


    {
        id: "hradec",
        name: "Hradec Králové",
        region: "Královéhradecký kraj",
        lat: 50.2092,
        lng: 15.8328,
        radius: 3500,

        price: 96898,
        rent: 294,

        green: 67,
        noise: 31,

        demo: {
            transport: 82,
            services: 84,
            schools: 86,
            parking: 72,
            safety: 88,
            flood: 37,
            development: 76
        },

        advantages: [
            "Dobrá infrastruktura",
            "Vysoký podíl zeleně",
            "Dobrá dostupnost služeb"
        ],

        risks: [
            "Vyšší ceny v atraktivních lokalitách",
            "Lokální dopravní zatížení",
            "Rozdílná dostupnost parkování"
        ]
    },


    {
        id: "usti",
        name: "Ústí nad Labem",
        region: "Ústecký kraj",
        lat: 50.6607,
        lng: 14.0323,
        radius: 3500,

        price: 51580,
        rent: 244,

        green: 59,
        noise: 43,

        demo: {
            transport: 72,
            services: 75,
            schools: 74,
            parking: 73,
            safety: 67,
            flood: 48,
            development: 77
        },

        advantages: [
            "Nižší cenová hladina",
            "Výrazné přírodní okolí",
            "Dobrá železniční dostupnost"
        ],

        risks: [
            "Výrazné rozdíly mezi lokalitami",
            "Členitý terén",
            "Lokální dopravní zatížení"
        ]
    },


    {
        id: "pardubice",
        name: "Pardubice",
        region: "Pardubický kraj",
        lat: 50.0343,
        lng: 15.7812,
        radius: 3500,

        price: 84773,
        rent: 288,

        green: 63,
        noise: 33,

        demo: {
            transport: 84,
            services: 83,
            schools: 83,
            parking: 71,
            safety: 87,
            flood: 44,
            development: 82
        },

        advantages: [
            "Dobrá železniční dostupnost",
            "Kompaktní město",
            "Dobrá občanská vybavenost"
        ],

        risks: [
            "Lokální povodňové riziko",
            "Dopravní zatížení hlavních komunikací",
            "Rostoucí tlak na novou výstavbu"
        ]
    },


    {
        id: "zlin",
        name: "Zlín",
        region: "Zlínský kraj",
        lat: 49.2244,
        lng: 17.6628,
        radius: 3500,

        price: 87253,
        rent: 284,

        green: 69,
        noise: 32,

        demo: {
            transport: 71,
            services: 80,
            schools: 80,
            parking: 63,
            safety: 86,
            flood: 40,
            development: 75
        },

        advantages: [
            "Velké množství zeleně",
            "Charakteristická městská struktura",
            "Dobrá občanská vybavenost"
        ],

        risks: [
            "Členitý terén",
            "Lokální dopravní omezení",
            "Rozdílná dostupnost jednotlivých částí"
        ]
    },


    {
        id: "karlovy-vary",
        name: "Karlovy Vary",
        region: "Karlovarský kraj",
        lat: 50.2319,
        lng: 12.8711,
        radius: 3500,

        price: 69660,
        rent: 236,

        green: 74,
        noise: 28,

        demo: {
            transport: 67,
            services: 74,
            schools: 70,
            parking: 62,
            safety: 89,
            flood: 35,
            development: 69
        },

        advantages: [
            "Vysoký podíl zeleně",
            "Lázeňské prostředí",
            "Klidnější charakter části města"
        ],

        risks: [
            "Členitý terén",
            "Rozdílná atraktivita jednotlivých částí",
            "Lokálně omezená dopravní kapacita"
        ]
    },


    {
        id: "jihlava",
        name: "Jihlava",
        region: "Kraj Vysočina",
        lat: 49.3961,
        lng: 15.5912,
        radius: 3200,

        price: 71148,
        rent: 248,

        green: 66,
        noise: 30,

        demo: {
            transport: 70,
            services: 73,
            schools: 74,
            parking: 75,
            safety: 88,
            flood: 31,
            development: 73
        },

        advantages: [
            "Klidnější charakter města",
            "Dobrá dostupnost přírody",
            "Nižší cenová hladina než ve velkých centrech"
        ],

        risks: [
            "Menší nabídka některých služeb",
            "Nižší dopravní kapacita než ve velkých městech",
            "Rozdílná dostupnost okrajových částí"
        ]
    }

];


/* ---------------------------------------------------------
   LEAFLET MAPA
--------------------------------------------------------- */

const map = L.map("map", {
    zoomControl: false,
    minZoom: 6,
    maxZoom: 18
}).setView(CZ_CENTER, CZ_ZOOM);


/* Zoom controls */
L.control.zoom({
    position: "bottomright"
}).addTo(map);


/* OpenStreetMap */
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }
).addTo(map);


/* ---------------------------------------------------------
   VRSTVY
--------------------------------------------------------- */

const zoneLayer = L.layerGroup().addTo(map);
const labelLayer = L.layerGroup().addTo(map);

let activeLayer = "prices";
let enabledLayers = new Set(["prices"]);

let selectedCity = null;


/* ---------------------------------------------------------
   POMOCNÉ FUNKCE
--------------------------------------------------------- */

function formatPrice(value) {
    return new Intl.NumberFormat("cs-CZ").format(value) + " Kč";
}


function getMinMax(property) {

    const values = CITIES.map(city => city[property]);

    return {
        min: Math.min(...values),
        max: Math.max(...values)
    };

}


function normalize(value, min, max) {

    if (max === min) {
        return 0.5;
    }

    return (value - min) / (max - min);
}


/* ---------------------------------------------------------
   BARVY ZÓN
--------------------------------------------------------- */

function priceColor(price) {

    const range = getMinMax("price");

    const normalized =
        normalize(price, range.min, range.max);

    /*
        levné = zelená
        střed = žlutá
        drahé = červená
    */

    const hue = 120 - normalized * 120;

    return `hsl(${hue}, 78%, 48%)`;
}


function rentColor(rent) {

    const range = getMinMax("rent");

    const normalized =
        normalize(rent, range.min, range.max);

    const hue = 120 - normalized * 120;

    return `hsl(${hue}, 70%, 48%)`;
}


function greenColor(value) {

    const normalized =
        normalize(value, 20, 80);

    const lightness =
        62 - normalized * 28;

    return `hsl(120, 55%, ${lightness}%)`;
}


function noiseColor(value) {

    /*
        nižší hluk = zelená
        vyšší hluk = červená
    */

    const normalized =
        normalize(value, 20, 70);

    const hue = 120 - normalized * 120;

    return `hsl(${hue}, 75%, 48%)`;
}


function getZoneColor(city) {

    switch (activeLayer) {

        case "prices":
            return priceColor(city.price);

        case "rent":
            return rentColor(city.rent);

        case "green":
            return greenColor(city.green);

        case "noise":
            return noiseColor(city.noise);

        case "transport":
            return "#4b7bec";

        case "schools":
            return "#7455d9";

        case "services":
            return "#159f91";

        case "parking":
            return "#d38b26";

        case "flood":
            return "#2388b8";

        case "development":
            return "#d65b32";

        default:
            return "#377dff";
    }

}


/* ---------------------------------------------------------
   POPIS AKTIVNÍ VRSTVY
--------------------------------------------------------- */

function updateLegend() {

    const title = document.getElementById("legendTitle");
    const status = document.getElementById("legendStatus");

    const low = document.getElementById("legendLow");
    const middle = document.getElementById("legendMiddle");
    const high = document.getElementById("legendHigh");

    const gradient = document.querySelector(".gradient");


    if (activeLayer === "prices") {

        title.textContent = "Ceny nemovitostí";
        status.textContent = "REAL DATA";

        low.textContent = "Levnější";
        middle.textContent = "Střed";
        high.textContent = "Dražší";

        gradient.style.background =
            "linear-gradient(90deg, hsl(120,78%,48%), hsl(60,78%,48%), hsl(0,78%,48%))";

    }


    else if (activeLayer === "rent") {

        title.textContent = "Nájemné";
        status.textContent = "REAL DATA";

        low.textContent = "Nižší nájem";
        middle.textContent = "Střed";
        high.textContent = "Vyšší nájem";

        gradient.style.background =
            "linear-gradient(90deg, hsl(120,70%,48%), hsl(60,70%,48%), hsl(0,70%,48%))";

    }


    else if (activeLayer === "green") {

        title.textContent = "Zeleň";
        status.textContent = "DEMO DATA";

        low.textContent = "Méně";
        middle.textContent = "Střed";
        high.textContent = "Více";

        gradient.style.background =
            "linear-gradient(90deg, hsl(120,55%,62%), hsl(120,55%,47%), hsl(120,55%,34%))";

    }


    else if (activeLayer === "noise") {

        title.textContent = "Hluk";
        status.textContent = "DEMO DATA";

        low.textContent = "Klid";
        middle.textContent = "Střed";
        high.textContent = "Hlučnější";

        gradient.style.background =
            "linear-gradient(90deg, hsl(120,75%,48%), hsl(60,75%,48%), hsl(0,75%,48%))";

    }


    else {

        const names = {
            transport: "Doprava",
            schools: "Školy",
            services: "Služby",
            parking: "Parkování",
            flood: "Povodňové riziko",
            development: "Rozvoj oblasti"
        };

        title.textContent =
            names[activeLayer] || "Vrstva";

        status.textContent = "DEMO DATA";

        low.textContent = "Nižší";
        middle.textContent = "Střed";
        high.textContent = "Vyšší";

        gradient.style.background =
            "linear-gradient(90deg, #d7e1f0, #6485c7, #263d73)";
    }

}


/* ---------------------------------------------------------
   VÝPOČET DEMO SKÓRE
--------------------------------------------------------- */

function getDemoScore(city) {

    const values = [
        city.demo.transport,
        city.demo.services,
        city.demo.schools,
        city.green,
        100 - city.noise,
        city.demo.parking
    ];

    const total =
        values.reduce((sum, value) => sum + value, 0);

    return Math.round(total / values.length);

}


/* ---------------------------------------------------------
   VYKRESLENÍ ZÓN
--------------------------------------------------------- */

function renderZones(cities = CITIES) {

    zoneLayer.clearLayers();
    labelLayer.clearLayers();


    if (enabledLayers.size === 0) {
        return;
    }


    cities.forEach(city => {

        const color =
            getZoneColor(city);

        const isSelected =
            selectedCity &&
            selectedCity.id === city.id;


        /* Hlavní kruhová analytická zóna */

        const circle = L.circle(
            [city.lat, city.lng],
            {
                radius: city.radius,

                color: color,
                weight: isSelected ? 4 : 2,

                fillColor: color,
                fillOpacity: isSelected ? 0.38 : 0.24,

                bubblingMouseEvents: true
            }
        );


        /* Hover tooltip */

        circle.bindTooltip(
            `
                <div class="map-tooltip">
                    <strong>${city.name}</strong>
                    <br>
                    <span>${formatPrice(city.price)} / m²</span>
                </div>
            `,
            {
                sticky: true,
                direction: "top",
                className: "custom-tooltip"
            }
        );


        /* Kliknutí */

        circle.on("click", () => {

            selectedCity = city;

            openDetail(city);

            map.flyTo(
                [city.lat, city.lng],
                10.8,
                {
                    duration: 0.9
                }
            );

            renderZones(getVisibleCities());

        });


        circle.addTo(zoneLayer);


        /* Střed města */

        const marker = L.circleMarker(
            [city.lat, city.lng],
            {
                radius: isSelected ? 8 : 6,

                color: "#ffffff",
                weight: 2,

                fillColor: color,
                fillOpacity: 1
            }
        );


        marker.bindTooltip(
            `
                <strong>${city.name}</strong>
                <br>
                ${formatPrice(city.price)} / m²
            `,
            {
                direction: "top",
                offset: [0, -5]
            }
        );


        marker.on("click", () => {

            selectedCity = city;

            openDetail(city);

            map.flyTo(
                [city.lat, city.lng],
                11,
                {
                    duration: 0.9
                }
            );

            renderZones(getVisibleCities());

        });


        marker.addTo(labelLayer);


        /* Textový label města */

        const label = L.marker(
            [city.lat, city.lng],
            {
                interactive: false,

                icon: L.divIcon({
                    className: "city-label-container",

                    html: `
                        <div class="city-label">
                            <strong>${city.name}</strong>
                            <span>${Math.round(city.price / 1000)} tis./m²</span>
                        </div>
                    `,

                    iconSize: [150, 45],
                    iconAnchor: [-8, 50]
                })
            }
        );


        label.addTo(labelLayer);

    });


    updateLegend();

}


/* ---------------------------------------------------------
   DETAIL PANEL
--------------------------------------------------------- */

function openDetail(city) {

    const panel =
        document.getElementById("detailPanel");

    const content =
        document.getElementById("detailContent");


    const score =
        getDemoScore(city);


    content.innerHTML = `

        <div class="detail-kicker">
            ANALYTICKÁ ZÓNA
        </div>

        <h2>${city.name}</h2>

        <div class="detail-region">
            ${city.region}
        </div>


        <div class="main-price-card">

            <span>Nabídková cena bytů</span>

            <strong>
                ${formatPrice(city.price)}
                <small>/ m²</small>
            </strong>

            <div class="price-source">
                RealityMIX · 09/2026
            </div>

        </div>


        <div class="score-header">

            <div>
                <span>DEMO SCORE</span>
                <strong>${score}/100</strong>
            </div>

            <div class="score-circle">
                ${score}
            </div>

        </div>


        <div class="score-grid">

            <div class="score-card">
                <span>🚆</span>
                <small>Doprava</small>
                <strong>${city.demo.transport}</strong>
            </div>

            <div class="score-card">
                <span>🏪</span>
                <small>Služby</small>
                <strong>${city.demo.services}</strong>
            </div>

            <div class="score-card">
                <span>🌳</span>
                <small>Zeleň</small>
                <strong>${city.green}</strong>
            </div>

            <div class="score-card">
                <span>🔇</span>
                <small>Klid</small>
                <strong>${100 - city.noise}</strong>
            </div>

            <div class="score-card">
                <span>🏫</span>
                <small>Školy</small>
                <strong>${city.demo.schools}</strong>
            </div>

            <div class="score-card">
                <span>🅿️</span>
                <small>Parkování</small>
                <strong>${city.demo.parking}</strong>
            </div>

        </div>


        <div class="detail-section">

            <div class="section-title">
                Výhody lokality
            </div>

            <ul class="advantages">

                ${city.advantages
                    .map(item => `<li>${item}</li>`)
                    .join("")}

            </ul>

        </div>


        <div class="detail-section">

            <div class="section-title">
                Rizika / omezení
            </div>

            <ul class="risks">

                ${city.risks
                    .map(item => `<li>${item}</li>`)
                    .join("")}

            </ul>

        </div>


        <div class="detail-section">

            <div class="section-title">
                Další údaje
            </div>

            <div class="data-row">
                <span>Průměrný nájem</span>
                <strong>${city.rent} Kč/m²/měs.</strong>
            </div>

            <div class="data-row">
                <span>Velikost zóny</span>
                <strong>${(city.radius / 1000).toFixed(1)} km</strong>
            </div>

        </div>


        <div class="data-warning">

            <strong>Metodika</strong>

            <p>
                Cena je nabídková cena bytů z RealityMIX.
                DEMO skóre, zeleň, hluk a lokální výhody/rizika
                jsou v této verzi demonstrační data a neslouží
                jako oficiální statistické hodnocení lokality.
            </p>

        </div>


        <a
            class="source-link"
            href="${DATA_SOURCES.prices.url}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Zdroj cen: RealityMIX ↗
        </a>

    `;


    panel.classList.add("open");

}


/* ---------------------------------------------------------
   ZAVŘÍT DETAIL
--------------------------------------------------------- */

document
    .getElementById("closeDetail")
    .addEventListener("click", () => {

        document
            .getElementById("detailPanel")
            .classList.remove("open");

        selectedCity = null;

        renderZones(getVisibleCities());

    });


/* ---------------------------------------------------------
   FILTRACE KRAJŮ
--------------------------------------------------------- */

function getVisibleCities() {

    const selectedRegion =
        document.getElementById("regionSelect").value;


    if (selectedRegion === "all") {
        return CITIES;
    }


    return CITIES.filter(
        city => city.region === selectedRegion
    );

}


/* ---------------------------------------------------------
   NAPLNĚNÍ SELECTU KRAJŮ
--------------------------------------------------------- */

const regionSelect =
    document.getElementById("regionSelect");


REGIONS.forEach(region => {

    const option =
        document.createElement("option");

    option.value = region;
    option.textContent = region;

    regionSelect.appendChild(option);

});


regionSelect.addEventListener("change", () => {

    const value = regionSelect.value;

    selectedCity = null;

    document
        .getElementById("detailPanel")
        .classList.remove("open");


    if (value === "all") {

        map.flyTo(
            CZ_CENTER,
            CZ_ZOOM,
            {
                duration: 0.9
            }
        );

    }

    else {

        const city =
            CITIES.find(
                item => item.region === value
            );

        if (city) {

            map.flyTo(
                [city.lat, city.lng],
                9.8,
                {
                    duration: 0.9
                }
            );

        }

    }


    renderZones(getVisibleCities());

});


/* ---------------------------------------------------------
   VRSTVY – CHECKBOXY + AKTIVNÍ VRSTVA
--------------------------------------------------------- */

document
    .querySelectorAll(".layer-row")
    .forEach(row => {

        const checkbox =
            row.querySelector("input");

        const layer =
            row.dataset.layer;


        row.addEventListener("click", event => {

            /*
                Kliknutí na checkbox pouze zapíná/vypíná.
                Kliknutí na text aktivuje barevnou vrstvu.
            */

            if (event.target === checkbox) {

                if (checkbox.checked) {

                    enabledLayers.add(layer);

                } else {

                    enabledLayers.delete(layer);

                }


                if (
                    !enabledLayers.has(activeLayer) &&
                    enabledLayers.size > 0
                ) {

                    activeLayer =
                        [...enabledLayers][0];

                }


                renderZones(getVisibleCities());

                return;
            }


            activeLayer = layer;

            if (!checkbox.checked) {
                checkbox.checked = true;
                enabledLayers.add(layer);
            }


            document
                .querySelectorAll(".layer-row")
                .forEach(item =>
                    item.classList.remove("active")
                );


            row.classList.add("active");


            renderZones(getVisibleCities());

        });

    });


/* ---------------------------------------------------------
   VYHLEDÁVÁNÍ
--------------------------------------------------------- */

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");


function updateSearchResults() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    searchResults.innerHTML = "";


    if (!query) {

        searchResults.classList.remove("visible");

        return;
    }


    const results =
        CITIES
            .filter(city =>
                city.name
                    .toLowerCase()
                    .includes(query) ||

                city.region
                    .toLowerCase()
                    .includes(query)
            )
            .slice(0, 6);


    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="search-empty">
                Zkus Enter pro vyhledání adresy
            </div>
        `;

    }

    else {

        results.forEach(city => {

            const item =
                document.createElement("button");

            item.className =
                "search-result";

            item.innerHTML = `
                <strong>${city.name}</strong>
                <span>${formatPrice(city.price)} / m²</span>
            `;


            item.addEventListener("click", () => {

                selectCity(city);

            });


            searchResults.appendChild(item);

        });

    }


    searchResults.classList.add("visible");

}


searchInput.addEventListener(
    "input",
    updateSearchResults
);


/* ---------------------------------------------------------
   VYBRAT MĚSTO
--------------------------------------------------------- */

function selectCity(city) {

    selectedCity = city;

    searchInput.value = city.name;

    searchResults.classList.remove("visible");

    regionSelect.value = city.region;


    openDetail(city);


    map.flyTo(
        [city.lat, city.lng],
        11,
        {
            duration: 0.9
        }
    );


    renderZones([city]);

}


/* ---------------------------------------------------------
   ENTER – VYHLEDÁNÍ
--------------------------------------------------------- */

searchForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const query =
            searchInput.value.trim();

        if (!query) return;


        /* Nejprve hledáme lokální demo zóny */

        const local =
            CITIES.find(city =>
                city.name
                    .toLowerCase() ===
                query.toLowerCase()
            );


        if (local) {

            selectCity(local);

            return;

        }


        /*
            Fallback:
            OpenStreetMap Nominatim.
            Používá se pouze po odeslání formuláře,
            nikoliv jako automatický autocomplete.
        */

        try {

            showToast("Vyhledávám lokalitu…");


            const url =
                "https://nominatim.openstreetmap.org/search" +
                "?format=jsonv2" +
                "&countrycodes=cz" +
                "&limit=1" +
                "&q=" +
                encodeURIComponent(query);


            const response =
                await fetch(url);


            const data =
                await response.json();


            if (!data.length) {

                showToast(
                    "Lokalitu se nepodařilo najít."
                );

                return;

            }


            const result = data[0];

            const lat =
                Number(result.lat);

            const lng =
                Number(result.lon);


            map.flyTo(
                [lat, lng],
                14,
                {
                    duration: 1
                }
            );


            showToast(
                `Nalezeno: ${result.display_name}`
            );


        }

        catch (error) {

            console.error(error);

            showToast(
                "Vyhledávání adresy se nepodařilo dokončit."
            );

        }

    }
);


/* ---------------------------------------------------------
   TOAST
--------------------------------------------------------- */

function showToast(message) {

    const toast =
        document.getElementById("locationToast");

    toast.textContent = message;

    toast.classList.add("visible");


    clearTimeout(
        window.__toastTimer
    );


    window.__toastTimer =
        setTimeout(() => {

            toast.classList.remove("visible");

        }, 3500);

}


/* ---------------------------------------------------------
   ZAVŘÍT VÝSLEDKY VYHLEDÁVÁNÍ
--------------------------------------------------------- */

document.addEventListener(
    "click",
    event => {

        if (
            !searchForm.contains(event.target)
        ) {

            searchResults.classList.remove(
                "visible"
            );

        }

    }
);


/* ---------------------------------------------------------
   PANEL VRSTEV
--------------------------------------------------------- */

const layersToggle =
    document.getElementById("layersToggle");

const layersContent =
    document.getElementById("layersContent");


layersToggle.addEventListener(
    "click",
    () => {

        const isHidden =
            layersContent.classList.toggle("collapsed");

        layersToggle.textContent =
            isHidden ? "+" : "−";

    }
);


/* ---------------------------------------------------------
   HRANICE ČESKÉ REPUBLIKY
--------------------------------------------------------- */

fetch(CZ_GEOJSON)
    .then(response => response.json())
    .then(data => {

        L.geoJSON(
            data,
            {
                style: {
                    color: "#1e4f9d",
                    weight: 2,
                    opacity: 0.75,
                    fillColor: "#5e8fd6",
                    fillOpacity: 0.025,
                    dashArray: "7 7"
                },

                interactive: false
            }
        ).addTo(map);

    })
    .catch(error => {

        console.warn(
            "Hranice ČR se nepodařilo načíst.",
            error
        );

    });


/* ---------------------------------------------------------
   INICIALIZACE
--------------------------------------------------------- */

renderZones(CITIES);

updateLegend();


/*
    Po vykreslení mapy odstraníme loading.
*/

setTimeout(() => {

    document
        .getElementById("mapLoading")
        .classList.add("hidden");

}, 900);
