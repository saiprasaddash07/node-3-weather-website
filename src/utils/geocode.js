const request = require('request');

//Geocoding api
// Address --> Lat/Long --> Weather

// const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/bhubaneswar.json?access_token=pk.eyJ1Ijoic2FpcHJhc2FkMDciLCJhIjoiY2s5eHJ5aHg3MDN0bTNncGNma3dmcTgweSJ9.MMggG2qBI4Y7Kc9x1sMViA&limit=1' ;
// request({ url : url2 , json:true} , (error,response)=>{
//     if(error){
//         console.log('Unable to connect to geocode service!') //low level os error
//     }else if(response.body.features === undefined){
//         console.log('Unable to find lattitude & longitude') ;
//     }else{
//     console.log(`The latitude for the given place is ${response.body.features[0].center[1]} and the longitude is ${response.body.features[0].center[0]}`) ;
//     }
// })

const geocode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FpcHJhc2FkMDciLCJhIjoiY2s5eHJ5aHg3MDN0bTNncGNma3dmcTgweSJ9.MMggG2qBI4Y7Kc9x1sMViA&limit=1` ;
    //request({url:url , json:true} , (error,response)=>{
    request({url , json:true} , (error,{body}={})=>{
    if(error){
        callback('Unable to connect to geocode service!',undefined) ;
    }else if(body.features.length === 0){ //else if(response.body.features === undefined) previously
        callback('Unable to find lattitude & longitude.Try some another search.',undefined) ;
    }else{
    //console.log(`The latitude for the given place is ${response.body.features[0].center[1]} and the longitude is ${response.body.features[0].center[0]}`) ;
    callback(undefined,{
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        location:body.features[0].place_name
    })
    }
})
}


module.exports = geocode;