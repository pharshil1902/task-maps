const express = require('express');


const router = express.Router();
const geocoder = require('../config/geocoder');
const calc = async(address)=>{
    address = '18TH ST: DOLORES ST to CHURCH ST  ';
    const loc = await geocoder.geocode(address);
    let a = {"lat": loc[0].latitude, "lgt":loc[0].longitude, "addr":address };
    //console.log(loc);
    return Promise.resolve(JSON.parse(JSON.stringify(a)));
}

module.exports.calc = calc;
module.exports.router = router;