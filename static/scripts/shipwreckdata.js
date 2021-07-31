// Strings to reference the data locations
shipDataRaw = "/static/data/ShipwrecksWAM_002.geojson"
sharkDataClean = "/static/data/sharks_cleaned.csv"

// Create new empty layers for ships and each shark species. These will contain the markers. 
var layers = {
        ships: new L.LayerGroup(),
        blacktip: new L.LayerGroup(),
        blue: new L.LayerGroup(),
        bull: new L.LayerGroup(),
        bronzeWhaler: new L.LayerGroup(),
        dusky: new L.LayerGroup(),
        greyNurse: new L.LayerGroup(),
        hammerhead: new L.LayerGroup(),
        mako: new L.LayerGroup(),
        tiger: new L.LayerGroup(),
        unknown: new L.LayerGroup(),
        white: new L.LayerGroup()
};
// Access the leaflet library and create a gps coordinate grid, the variable map, to plot the data to.
// the empty layers are added to the map, they will be filled later.
var map = L.map("map", {
    center: [-31.98,115.70],
    zoom: 12,
    worldCopyJump: "True",
    layers: [
        layers.ships,
        layers.blacktip,
        layers.blue,
        layers.bull,
        layers.bronzeWhaler,
        layers.dusky,
        layers.greyNurse,
        layers.hammerhead,
        layers.mako,
        layers.tiger,
        layers.white,
        layers.unknown
    ]
});

// Get the background map from the leaflet API, and add it to the gps coordinate grid
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(map);

// Set up an object to reference each layer. This will be used to create the toggle control
var overlays = {
    "Ships": layers.ships,
    "Blacktip": layers.blacktip,
    "Blue": layers.blue,
    "Bull": layers.bull,
    "Bronze Whaler": layers.bronzeWhaler,
    "Dusky": layers.dusky,
    "Grey Nurse": layers.greyNurse,
    "Hammerhead": layers.hammerhead,
    "Mako": layers.mako,
    "Tiger": layers.tiger,
    "White": layers.white,
    "species unknown": layers.unknown
    };

 
// Use the overlay object to create a control panel for each layer, and add it to the map
// This allows toggling of which layer we want to display
L.control.layers(null,overlays,{
    collapsed: false
}).addTo(map);

let shipMarker = L.icon({
    iconUrl: "/static/images/icons8-historic-ship-50.png",
    iconSize: [13,13],
    iconAnchor: [5,5],
    popupAnchr: [-10,-20]
})

// Add ships to the map by filling the previously created ship layer
let shipData = d3.json(shipDataRaw).then((rawData)=> {
    var ships = L.geoJSON(rawData.features, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: shipMarker
            })
        }
    });
    ships.addTo(map);
    ships.addTo(layers['ships'])
});

   // Set up and object containiner a color reference for each shark species
var customIcon = L.Icon.extend({
options: {
    iconSize: [25,25],
    iconAnchor: [13,13],
    popupAnchor: [-24,-50]
}
});

var customMarkers = {
    blacktip: new customIcon({iconUrl: "/static/images/black-shark-24.png" }),
    blue: new customIcon({ iconUrl: "/static/images/blue-shark-24.png" }),
    bull: new customIcon({iconUrl: "/static/images/yellow-shark-24.png" }),
    bronzeWhaler: new customIcon({iconUrl: "/static/images/orange-shark-24.png" }),
    dusky: new customIcon({iconUrl: "/static/images/brown-shark-24.png" }),
    greyNurse: new customIcon({iconUrl: "/static/images/gray-shark-24.png" }),
    hammerhead: new customIcon({iconUrl: "/static/images/black-shark-24.png" }),
    mako: new customIcon({iconUrl: "/static/images/pink-shark-24.png" }),
    tiger: new customIcon({iconUrl: "/static/images/purple-shark-24.png" }),
    unknown: new customIcon({iconUrl: "/static/images/red-shark-24.png" }),
    white: new customIcon({iconUrl: "/static/images/white-shark-24.png" })
};

// Add sharks to the map by filling the previously created species layers
let sharkData = d3.csv(sharkDataClean).then((sharkData)=> {

    // create an empty variable to hold the shark species
    // this will be filled for each report by the logic path
    var sharkSpecies = "";

    // iterate through every shark report in the data set
    for (var i = 0; i < sharkData.length; i++) {

        // Logic path to determine which species layer to add the marker to
        if (sharkData[i].SightingSpeciesValue == "bronze whaler") {
            sharkSpecies = "bronzeWhaler";
        }
        else if (sharkData[i].SightingSpeciesValue == "grey nurse") {
            sharkSpecies = "greyNurse";
        }
        else if (sharkData[i].SightingSpeciesValue == "unknown sp.") {
            sharkSpecies = "unknown";
        }
        else {
            sharkSpecies = sharkData[i].SightingSpeciesValue;
        }

        // get the latitude and longitude of the report
        var lat = parseFloat(sharkData[i].LocationY);
        var lon = parseFloat(sharkData[i].LocationX);

        // place a new marker on the map, in the correct species layer 
        var placeMarker = L.marker([lat,lon],{
            icon: customMarkers[sharkSpecies]
        })
        placeMarker.addTo(map);
        placeMarker.addTo(layers[sharkSpecies]);
    }
    layers.unknown.removeFrom(map);
})

function addLegend(map) {
    var legend = L.control({position:"bottomleft"});

    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += '<h3>Map Icons</h3>';
        div.innerHTML += '<i style="background: #ffffcc"></i><span>0-10</span><br>';
        div.innerHTML += '<i style="background: #ffeda0"></i><span>11-20</span><br>';
        div.innerHTML += '<i style="background: #fed976"></i><span>21-30</span><br>';
        div.innerHTML += '<i style="background: #feb24c"></i><span>31-40</span><br>';
        div.innerHTML += '<i style="background: #fd8d3c"></i><span>41-50</span><br>';
        div.innerHTML += '<i style="background: #fc4e2a"></i><span>51-60</span><br>';
        div.innerHTML += '<i style="background: #e31a1c"></i><span>61-70</span><br>';
        div.innerHTML += '<i style="background: #b10026"></i><span> >70</span><br>';
        div.innerHTML += '<i style="background: #fd8d3c"></i><span>41-50</span><br>';
        div.innerHTML += '<i style="background: #fc4e2a"></i><span>51-60</span><br>';
        div.innerHTML += '<i style="background: #e31a1c"></i><span>61-70</span><br>';
        div.innerHTML += '<i style="background: #b10026"></i><span> >70</span><br>';

        return div;
    }
    legend.addTo(map);
}

addLegend(map);





