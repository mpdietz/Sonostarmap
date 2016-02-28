// Add mapp
var map = L.map('myMap').setView([40.7127837, -74.0059413], 2);

var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

map.addLayer(layer)

var options = {     
  land:'#FFFFFF',
  water:'#D3D3D3',
  marker:'#762a83',
  topojsonSrc: 'js/world.json'
}

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

var miniMap = new L.Control.GlobeMiniMap(options).addTo(map);

 var panOptions = {
    animate: true,
    duration: 2
  }

  // From Chloropleth tutorial

var geojson;

  // this function takes a value and returns a color based on which bucket the value falls between
  function getColor(d) {
      return d > 1000000000 ? '#1b7837':
             d > 100000000  ? '#5aae61':
             d > 50000000  ? '#a6dba0':
             d > 10000000  ? '#d9f0d3' :
             d > 5000000   ? '#f6e8c3':
             d > 100000   ? '#d8b365':
             d < 100000   ? '#8c510a':
                        '#FFFFFF';
  }

  //this function returns a style object, but dynamically sets fillColor based on the data
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.POP_EST),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.8
    };
  }

  //this function is set to run when a user mouses over any polygon
  function mouseoverFunction(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#762a83',
        dashArray: '',
        fillOpacity: 0.5
    });

      console.log(layer.feature.properties.FORMAL_EN);
    $('#infoWindow').text(' Name:    ' + layer.feature.properties.FORMAL_EN + '    Population: ' + layer.feature.properties.POP_EST);
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