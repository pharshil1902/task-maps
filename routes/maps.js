var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
mapboxgl.accessToken = 'pk.eyJ1IjoicGhhcnNoaWwxOTAyIiwiYSI6ImNrbzFrMDV6ZjA5ODcyb3E5cDFubW93aWwifQ.dgyiIUEdqHuZ0zeoE1g9uw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11'
});