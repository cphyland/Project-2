shipDataRaw = "../data/Shipwrecks/ShipwrecksWAM_002.geojson"

let data = d3.json(shipDataRaw).then((rawData)=> {
    console.log(rawData);
});

console.log("test linkage")