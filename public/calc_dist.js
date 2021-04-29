const fs = require('fs');
const { raw } = require('body-parser');
const path = require('path');
let ori = require('../routes/trucks');

var haversine = require("haversine-distance");
const { resolve } = require('path');
const { rejects } = require('assert');
const router = require('../routes/trucks').router;

  

var orig  ;

/*
const origg = async ()=>{
    try{
        const dt = await ori.calc(x=>{return x});
        console.log(dt);
        orig = dt;
        return dt;
    }catch(err){
        console.log(err);
    }
}
*/

let rawdata = fs.readFileSync('rows.json');
var cities = JSON.parse(rawdata);
origi ={
    lat:" ",
    lgt:""
}

console.log("_______________________");
async function dr(){
    var v = await ori.calc();
    
}
console.log("_______________________");


dr();

//console.log(cities.data[0]);
module.exports.distan = ori.calc('vadodara').then(v=>{
   console.log(v);
    var array = [];
    let min = 999999999;
    let addd="";
    for (var i=0;i<cities.data.length;i++) {
        var city = cities.data[i];
        //console.log(city[12]);
       // console.log(city[22]);
       // console.log(city[23]);
       // console.log(city[19]);
       var point1 = { lat: v.lat, lng: v.lgt }

        //Second point in your haversine calculation
        var point2 = { lat: city[22], lng: city[23] }
        var haversine_m = haversine(point1, point2); //Results in meters (default)
        var haversine_km = haversine_m /1000; 

        var dist = haversine_km;
       //let dist = calculatedistance(v.lat,v.lgt,22,73.19);
        array.push({
            cityName: city[12],
            distance: dist,
            lat: city[22],
            lgt: city[23],
            item: city[19]
        });
        array.sort(function(a, b){
            return a.distance - b.distance;
        });
        if(dist < min){
            min=dist;
            addd = city[12];
        }
        
                
        
    }
    //array.sort();
    for(var i=0;i<5;i++){
       console.log(array[i]);
    }
    
   console.log(min+" "+ addd);
   var data = [];
   /*
   {
    // feature for Mapbox DC
            {
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

         data.push(JSON.parse(JSON.stringify(v)));
         for(var i=0;i<7;i++){
            w = {
                'type': 'Feature',
                'geometry': {
                'type': 'Point',
                'coordinates': [array[i].lat,array[i].lgt]
                },
                'properties': {
                'title': array[i].cityName,
                'item': array[i].item
                }
             }
            data.push(
                JSON.parse(JSON.stringify(w))
            )
         }
         /*
         data.forEach(element => {
             console.log(element);
         });
         */
      //  for(var i=0;i<data.length;i++)
         
        d = JSON.parse(JSON.stringify(data));
        console.log(d);
        module.exports.arr = new Promise((resolve,reject)=>{
            resolve(data);
        }); 

        router.get('',(req,res)=>{
            res.send(data);
        });

        return new Promise((resolve,reject)=>{
            resolve(d);
        });

  
    })

//var orig = origg();
//console.log(orig);
//console.log(ori);
//console.log('-----------------------');
//a = {"lat":orig.latitude,"lgt":orig.longitude};
//var origin = JSON.parse(a);


//console.log(origin);

//console.log(origin);

//console.log(origin);

// cities to sort

//console.log(cities[0]);
// 12 - address
// 19 - food item
// 22 - lat
// 23 -lgt




function calculateDistance(lat1,lgt1,lat2,lgt2) {
    var erdRadius = 6371;

    lgt1 = lgt1 * (Math.PI / 180);
    lat1 = lat1 * (Math.PI / 180);
    lgt2 = lgt2 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);

    var x0 = lgt1 * erdRadius * Math.cos(lat1);
    var y0 = lat1 * erdRadius;

    var x1 = lgt2 * erdRadius * Math.cos(lat2);
    var y1 = lat2 * erdRadius;

    var dx = x0 - x1;
    var dy = y0 - y1;

    return Math.sqrt((dx * dx) + (dy * dy));
}

//First point in your haversine calculation
