shipDataRaw = "../data/Shipwrecks/ShipwrecksWAM_002.geojson"

var overlayMaps = {
    Ships: new L.LayerGroup(),
   
};

var map = L.map("map", {
    center: [37.09,-95.71],
    zoom: 5,
    worldCopyJump: "True",
    layers: [
        overlayMaps.Ships
   
    ]
});

var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(map);

let data = d3.json(shipDataRaw).then((rawData)=> {
    var ships = L.geoJSON(rawData.features);
    ships.addTo(map);
    ships.addTo(overlayMaps['Ships'])
});

console.log("test linkage")