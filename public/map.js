//const ori = require('./calc_dist').oris;

mapboxgl.accessToken = 'pk.eyJ1IjoicGhhcnNoaWwxOTAyIiwiYSI6ImNrbzFrMDV6ZjA5ODcyb3E5cDFubW93aWwifQ.dgyiIUEdqHuZ0zeoE1g9uw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom:9,
center:[73.36,22.50]
});

/*
{
        // feature for Mapbox DC
                'type': 'Feature',
                'geometry': {
                'type': 'Point',
                'coordinates': [73.36,22.50]
                },
                'properties': {
                'title': 'Vadodara'
                }
             }
*/
const ori = require('./calc_dist').oris;
var array = ori();
for(var i=0;i<7;i++){
    console.log(array[i]);
}
function loadMap(){
    map.on('load', function () {
        // Add an image to use as a custom marker
        map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
        // Add a GeoJSON source with 2 points
        map.addSource('points', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': array
        
    }
        });
         
        // Add a symbol layer
        map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
        'icon-image': 'custom-marker',
        // get the title name from the source's "title" property
        'text-field': ['get', 'title','item'],
        'text-font': [
        'Open Sans Semibold',
        'Arial Unicode MS Bold'
        ],
        'text-offset': [0, 1.25],
        'text-anchor': 'top'
        }
        });
        }
        );
        });
    }

loadMap();