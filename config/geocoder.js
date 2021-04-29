const { json } = require('body-parser');
const { model } = require('mongoose');

const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',

  // Optional depending on the providers
  httpAdapter:'https',
  
  apiKey: 'Wa6AlFoIEfIg4N96rdskpBboiXf7SrA0', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);
let array=[]
async function position(address){
    try{
    var loc = await geocoder.geocode(address);
   // console.log(loc[0].latitude);
    //console.log(loc[0].longitude);
    //console.log(loc);
    let a = {lat: loc[0].latitude, lgt:loc[0].longitude };
    a = JSON.stringify(a);
   // console.log(a);
    return a ;

    }
    catch(err){
        console.log(err);
    }
   
   
}

module.exports = geocoder;



