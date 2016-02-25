// Add mapp
var map = L.map('myMap').setView([40.7127837, -74.0059413], 1);

var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

map.addLayer(layer)

// var options = {     
//   land:'#FFFF00',
//   water:'#3333FF',
//   marker:'#55c107',
//   topojsonSrc: 'path/to/world.json'
// }

// var miniMap = new L.Control.GlobeMiniMap(options).addTo(map);

 var panOptions = {
    animate: true,
    duration: 2
  }

  // From Chloropleth tutorial

var geojson;

  // this function takes a value and returns a color based on which bucket the value falls between
  function getColor(d) {
      return d > 1000000000 ? '#8c510a' :
             d > 500000000  ? '#d8b365' :
             d > 200000000  ? '#f6e8c3' :
             d > 10000000  ? '#d9f0d3' :
             d > 5000000   ? '#a6dba0' :
             d > 100000   ? '#5aae61' :
             d < 100000   ? '#1b7837' :
                        '#FFFFFF';
  }

  //this function returns a style object, but dynamically sets fillColor based on the data
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.POP_EST),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  //this function is set to run when a user mouses over any polygon
  function mouseoverFunction(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#762a83',
        dashArray: '',
        fillOpacity: 0.7
    });

      console.log(layer.feature.properties.FORMAL_EN);
    $('#infoWindow').text('Name:' + layer.feature.properties.FORMAL_EN + '</br> Population:' + layer.feature.properties.POP_EST);
  }


  //this runs on mouseout
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  //this is executed once for each feature in the data, and adds listeners
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }

  $.getJSON('data/world-countries.geojson', function(name) {
    geojson = L.geoJson(name,{
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);
  });