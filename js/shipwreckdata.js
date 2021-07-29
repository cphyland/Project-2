// Strings to reference the data locations
shipDataRaw = "../data/Shipwrecks/ShipwrecksWAM_002.geojson"
sharkDataClean = "../data/sharks/sharks_cleaned.csv"

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
    center: [-27.67,121.63],
    zoom: 5,
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
        layers.unknown,
        layers.white
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
    "Unknown": layers.unknown
    };

// Use the overlay object to create a control panel for each layer, and add it to the map
// This allows toggling of which layer we want to display
L.control.layers(null,overlays,{
    collapsed: false
}).addTo(map);



// Add ships to the map by filling the previously created ship layer
let shipData = d3.json(shipDataRaw).then((rawData)=> {
    var ships = L.geoJSON(rawData.features);
    ships.addTo(map);
    ships.addTo(layers['ships'])
});

// Set up and object containiner a color reference for each shark species
var sharkColors = {
    blacktip: 'black',
    blue: 'darkblue',
    bull: 'red',
    bronzeWhaler: 'orange',
    dusky: 'grey',
    greyNurse: 'yellow',
    hammerhead: 'pink',
    mako: 'purple',
    tiger: 'green',
    unknown: 'darkgrey',
    white: 'white'
};

var sharkIcon = L.Icon.extend({
    options: {
        iconSize: [25,25],
        iconAnchor: [13,13],
        popupAnchor: [-24,-50]
    }
});

var sharkMarkers = {
    blacktip: new sharkIcon({iconUrl: 'black'}),
    blue: new sharkIcon({iconUrl: 'black'}),
    bull: new sharkIcon({iconUrl: 'black'}),
    bronzeWhaler: new sharkIcon({iconUrl: 'black'}),
    dusky: new sharkIcon({iconUrl: 'black'}),
    greyNurse: new sharkIcon({iconUrl: 'black'}),
    hammerhead: new sharkIcon({iconUrl: 'black'}),
    mako: new sharkIcon({iconUrl: 'black'}),
    tiger: new sharkIcon({iconUrl: 'black'}),
    unknown: new sharkIcon({iconUrl: 'black'}),
    white: new sharkIcon({iconUrl: 'black'})
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
        var placeMarker = L.circleMarker([lat,lon],{
            color: sharkColors[sharkSpecies]
        });
        placeMarker.addTo(map);
        placeMarker.addTo(layers[sharkSpecies]);
    }
})





