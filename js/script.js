// Add mapp
var map = L.map('myMap').setView([40.7127837, -74.0059413], 1);

var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

map.addLayer(layer)

var options = {     
  land:'#FFFF00',
  water:'#3333FF',
  marker:'#55c107',
  topojsonSrc: 'path/to/world.json'
}

var miniMap = new L.Control.GlobeMiniMap(options).addTo(map);

//  $.getJSON('data/world-countries.geojson', function(data) {
//     console.log(data);

//  var panOptions = {
//     animate: true,
//     duration: 2
//   }

//   // From Chloropleth tutorial

// var geojson;

//   //this function takes a value and returns a color based on which bucket the value falls between
//   function getColor(d) {
//       return d > 1000000000 ? '#0000cc' :
//              d > 500000000  ? '#BD0026' :
//              d > 200000000  ? '#E31A1C' :
//              d > 10000000  ? '#FC4E2A' :
//              d > 5000000   ? '#FD8D3C' :
//              d > 100000   ? '#FEB24C' :
//              d < 100000   ? '#FED976' :
//                         '#FFFFFF';
//   }

//   //this function returns a style object, but dynamically sets fillColor based on the data
//   function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.POP_EST),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
//   }

//   //this function is set to run when a user mouses over any polygon
//   function mouseoverFunction(e) {
//     var layer = e.target;

//     layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//     });

//     if (!L.Browser.ie && !L.Browser.opera) {
//         layer.bringToFront();
//     }

// // Update the infowindow
//       console.log(layer.feature.properties.FORMAL_EN);
//     $('#infoWindow').text(layer.feature.properties.FORMAL_EN);
//   }

//   $.getJSON('data/world-countries.geojson', function(name) {
//     geojson = L.geoJson(name,{
//       style: style,
//       onEachFeature: onEachFeature
//     }).addTo(map);
//   });