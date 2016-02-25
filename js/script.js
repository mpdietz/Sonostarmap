// Add mapp
var basemapUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
  var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

  //initialize map1
  var map1 = L.map('map1', {
    scrollWheelZoom: false
  }).setView( [40.706913,-73.987513], 1);

var layer = L.tileLayer(basemapUrl, {
  attribution: attribution
});

map.addLayer(layer)

  $.getJSON('data/world-countries.geojson', function(data) {
    console.log(data);

  galleryimages.forEach(function(element) {
    var marker = L.marker(element.geolocation).addTo(map);
    marker.bindPopup(element.title + "<b> </b>" + '<div class ="galleryimg">' + "<img src =" + element.url + " width='300' height='300'/>" + 
     '</div>')
  });

 var panOptions = {
    animate: true,
    duration: 2
  }

  // From Chloropleth tutorial

var geojson;

  //this function takes a value and returns a color based on which bucket the value falls between
  function getColor(d) {
      return d > 1000 ? '#0000cc' :
             d > 500  ? '#BD0026' :
             d > 200  ? '#E31A1C' :
             d > 100  ? '#FC4E2A' :
             d > 50   ? '#FD8D3C' :
             d > 20   ? '#FEB24C' :
             d > 10   ? '#FED976' :
                        '#FFEDA0';
  }

  //this function returns a style object, but dynamically sets fillColor based on the data
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
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
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

// Update the infowindow
      console.log(layer.feature.properties.name);
    $('#infoWindow').text(layer.feature.properties.name);

  }

  $.getJSON('data/world-countries.geojson', function(state_data) {
    geojson = L.geoJson(state_data,{
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map3);
  });