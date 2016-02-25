var map = L.map('myMap').setView([40.7127837, -74.0059413], 9);

var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

map.addLayer(layer)

  galleryimages.forEach(function(element) {
    var marker = L.marker(element.geolocation).addTo(map);
    marker.bindPopup(element.title + "<b> </b>" + '<div class ="galleryimg">' + "<img src =" + element.url + " width='300' height='300'/>" + 
     '</div>')
  });

 var panOptions = {
    animate: true,
    duration: 2
  }