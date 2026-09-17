/* =====================================================
   BYDLENÍ MAP
   ETAPA 1
   DEMO DATA ONLY
===================================================== */


/* =====================================================
   DEMO DATA
===================================================== */

const demoLocations = [

    {
        id: "dejvice",

        name: "Dejvice",

        city: "Praha",

        latitude: 50.1018,

        longitude: 14.3888,

        scores: {
            transport: 9,
            services: 9,
            greenery: 8,
            quietness: 6,
            parking: 5
        },

        advantages: [
            "Výborná dostupnost MHD",
            "Dobrá občanská vybavenost",
            "Blízkost zeleně"
        ],

        risks: [
            "Vyšší dopravní hluk v některých částech",
            "Vyšší ceny nemovitostí",
            "Omezené parkování"
        }
    },


    {
        id: "veleslavin",

        name: "Veleslavín",

        city: "Praha",

        latitude: 50.0956,

        longitude: 14.3495,

        scores: {
            transport: 8,
            services: 7,
            greenery: 9,
            quietness: 8,
            parking: 6
        },

        advantages: [
            "Dobrá dostupnost MHD",
            "Blízkost zeleně",
            "Klidnější rezidenční charakter"
        ],

        risks: [
            "Méně služeb v některých částech",
            "Lokální dopravní hluk"
        ]
    },


    {
        id: "vokovice",

        name: "Vokovice",

        city: "Praha",

        latitude: 50.1010,

        longitude: 14.3330,

        scores: {
            transport: 8,
            services: 7,
            greenery: 8,
            quietness: 7,
            parking: 6
        },

        advantages: [
            "Dobré spojení MHD",
            "Blízkost přírody",
            "Rezidenční charakter"
        ],

        risks: [
            "Dopravní zatížení některých komunikací",
            "Omezená nabídka parkování"
        ]
    }

];


/* =====================================================
   MAP INITIALIZATION
===================================================== */

const map = new maplibregl.Map({

    container: "map",

    style:
        "https://demotiles.maplibre.org/style.json",

    center: [
        15.4729,
        49.8175
    ],

    zoom: 6.5,

    minZoom: 5,

    maxZoom: 18

});


/* =====================================================
   NAVIGATION CONTROL
===================================================== */

map.addControl(

    new maplibregl.NavigationControl(),

    "bottom-right"

);


/* =====================================================
   LOCATION MARKERS
===================================================== */

const markers = [];


function createMarkers() {

    demoLocations.forEach(location => {

        const element =
            document.createElement("button");

        element.className =
            "location-marker";

        element.title =
            location.name;


        element.addEventListener(
            "click",
            () => {

                openLocation(location);

                map.flyTo({

                    center: [
                        location.longitude,
                        location.latitude
                    ],

                    zoom: 13,

                    duration: 1000

                });

            }
        );


        const marker =
            new maplibregl.Marker({

                element: element,

                anchor: "center"

            })

            .setLngLat([

                location.longitude,

                location.latitude

            ])

            .addTo(map);


        markers.push(marker);

    });

}


map.on(
    "load",
    createMarkers
);


/* =====================================================
   LOCATION PANEL
===================================================== */

const locationPanel =
    document.getElementById(
        "locationPanel"
    );


function openLocation(location) {

    document.getElementById(
        "locationName"
    ).textContent =
        location.name;


    document.getElementById(
        "locationCity"
    ).textContent =
        location.city;


    document.getElementById(
        "transportScore"
    ).textContent =
        location.scores.transport;


    document.getElementById(
        "servicesScore"
    ).textContent =
        location.scores.services;


    document.getElementById(
        "greeneryScore"
    ).textContent =
        location.scores.greenery;


    document.getElementById(
        "quietnessScore"
    ).textContent =
        location.scores.quietness;


    document.getElementById(
        "parkingScore"
    ).textContent =
        location.scores.parking;


    renderAdvantages(
        location.advantages
    );


    renderRisks(
        location.risks
    );


    locationPanel.classList.add(
        "visible"
    );

}


/* =====================================================
   CLOSE LOCATION
===================================================== */

document
    .getElementById("closePanel")
    .addEventListener(
        "click",
        () => {

            locationPanel.classList.remove(
                "visible"
            );

        }
    );


/* =====================================================
   ADVANTAGES
===================================================== */

function renderAdvantages(items) {

    const container =
        document.getElementById(
            "advantages"
        );


    container.innerHTML = "";


    items.forEach(item => {

        const element =
            document.createElement("div");


        element.className =
            "info-item";


        element.innerHTML = `

            <span class="advantage-icon">
                ✓
            </span>

            <span>
                ${item}
            </span>

        `;


        container.appendChild(
            element
        );

    });

}


/* =====================================================
   RISKS
===================================================== */

function renderRisks(items) {

    const container =
        document.getElementById(
            "risks"
        );


    container.innerHTML = "";


    items.forEach(item => {

        const element =
            document.createElement("div");


        element.className =
            "info-item";


        element.innerHTML = `

            <span class="risk-icon">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </span>

            <span>
                ${item}
            </span>

        `;


        container.appendChild(
            element
        );

    });

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchResults =
    document.getElementById(
        "searchResults"
    );


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        searchResults.innerHTML = "";


        if (!query) {

            searchResults.style.display =
                "none";

            return;

        }


        const results =
            demoLocations.filter(
                location =>

                    location.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    location.city
                        .toLowerCase()
                        .includes(query)
            );


        if (!results.length) {

            searchResults.style.display =
                "none";

            return;

        }


        results.forEach(location => {

            const result =
                document.createElement(
                    "button"
                );


            result.className =
                "search-result";


            result.innerHTML = `

                <div class="search-result-icon">

                    <i class="fa-solid fa-location-dot"></i>

                </div>

                <div>

                    <div class="search-result-name">
                        ${location.name}
                    </div>

                    <div class="search-result-city">
                        ${location.city}
                    </div>

                </div>

            `;


            result.addEventListener(
                "click",
                () => {

                    openLocation(
                        location
                    );


                    map.flyTo({

                        center: [
                            location.longitude,
                            location.latitude
                        ],

                        zoom: 13,

                        duration: 1000

                    });


                    searchInput.value =
                        "";

                    searchResults.style.display =
                        "none";

                }
            );


            searchResults.appendChild(
                result
            );

        });


        searchResults.style.display =
            "block";

    }
);


/* =====================================================
   CLICK OUTSIDE SEARCH
===================================================== */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".search-container"
            )
        ) {

            searchResults.style.display =
                "none";

        }

    }
);


/* =====================================================
   MAP LAYERS
===================================================== */

const layerInputs =
    document.querySelectorAll(
        ".layer-item input"
    );


layerInputs.forEach(input => {

    input.addEventListener(
        "change",
        () => {

            const layer =
                input.dataset.layer;


            toggleLayer(
                layer,
                input.checked
            );

        }
    );

});


function toggleLayer(
    layer,
    enabled
) {

    /*
        ZATÍM DEMO.

        Tady později připojíme
        skutečné MapLibre vrstvy.

        Například:

        prices
        → cenová heatmapa

        transport
        → zastávky MHD

        noise
        → hluková mapa

        schools
        → školy

        greenery
        → parky a zeleň

        flood
        → povodňové oblasti
    */


    console.log(
        `Layer ${layer}:`,
        enabled
            ? "ON"
            : "OFF"
    );

}


/* =====================================================
   MOBILE LAYERS
===================================================== */

const mobileLayers =
    document.getElementById(
        "mobileLayers"
    );


mobileLayers.addEventListener(
    "click",
    () => {

        const panel =
            document.querySelector(
                ".layers-panel"
            );


        if (
            panel.style.display ===
            "block"
        ) {

            panel.style.display =
                "none";

        } else {

            panel.style.display =
                "block";

            panel.style.position =
                "absolute";

            panel.style.left =
                "12px";

            panel.style.right =
                "12px";

            panel.style.bottom =
                "75px";

            panel.style.width =
                "auto";

        }

    }
);


/* =====================================================
   LOCATE BUTTON
===================================================== */

document
    .getElementById("locateButton")
    .addEventListener(
        "click",
        () => {

            if (
                !navigator.geolocation
            ) {

                alert(
                    "Geolokace není v tomto prohlížeči podporována."
                );

                return;

            }


            navigator.geolocation.getCurrentPosition(

                position => {

                    const longitude =
                        position.coords.longitude;

                    const latitude =
                        position.coords.latitude;


                    map.flyTo({

                        center: [
                            longitude,
                            latitude
                        ],

                        zoom: 14,

                        duration: 1000

                    });

                },

                () => {

                    alert(
                        "Nepodařilo se získat vaši polohu."
                    );

                }

            );

        }
    );
